import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context)
        let request = ctx.getContext().req as Request
        
        let token = this.extractTokenFromHeader(request)

        if(!token){
            throw new UnauthorizedException()
        }

        try {
            let payload = await this.jwtService.verifyAsync(token)
            request['user'] = payload
            return true
        } catch (error) {
            throw new UnauthorizedException()
        }
    }

    private extractTokenFromHeader(request: Request):string | undefined {
        let [type, token] = request.headers.authorization?.split(" ") || []

        return type == "Bearer" ? token : undefined
    }
}