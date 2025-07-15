import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { RegisterModel } from './models/models';
import { FileUpload } from 'graphql-upload-ts';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma:PrismaService,
        private jwtService: JwtService
    ){}

    private async generateToken(id:number){
        return {
        accessToken: await this.jwtService.signAsync({ sub: id }),
        refreshToken: await this.jwtService.signAsync({sub:id})
        }
    }

    async register( payload: RegisterDto, avatar?: FileUpload): Promise<RegisterModel> {
        const isEmailExist = await this.prisma.user.findUnique({
        where: { email: payload.email },
        });
        if (isEmailExist) throw new ConflictException('Email already exists');

        const hashed_pass = await bcrypt.hash(payload.password, 10);

        const newUser = await this.prisma.user.create({
        data: {
            ...payload,
            password: hashed_pass,
        },
        });

        let avatarUrl: string | undefined;
        if (avatar) {
        const uploadDir = join(process.cwd(), 'uploads');
        if (!existsSync(uploadDir)) mkdirSync(uploadDir);

        const { createReadStream, filename } = avatar;
        const uniqueName = `${newUser.id}_${Date.now()}_${filename}`;
        const filePath = join(uploadDir, uniqueName);

        await new Promise<void> ((resolve, reject) => {
            createReadStream()
            .pipe(createWriteStream(filePath))
            .on('finish', resolve)
            .on('error', reject);
        });

        avatarUrl = `/uploads/${uniqueName}`;
        }

        const tokens = await this.generateToken(newUser.id);

        return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        avatarUrl,
        };
    }

    async login(payload:LoginDto): Promise<RegisterModel> {
        const oldUser = await this.prisma.user.findUnique({
            where:{email:payload.email}
        })

        if(!oldUser){
            throw new NotFoundException("Email not found")
        }

        const isMatch = await bcrypt.compare(oldUser.password,payload.password)
        if(!isMatch){
            throw new ConflictException("Password incorrect")
        }

        return await this.generateToken(oldUser.id)
    }
}
