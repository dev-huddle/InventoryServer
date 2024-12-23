import { injectable } from "tsyringe";
import { LoginUserInput, LoginUserOutput, RefreshTokenInput, RefreshTokenOutput, RegisterUserInput, RegisterUserOutput } from "../interfaces";
import { UserRepository } from "../../../shared/database/repositories";
import { BadRequestError } from "../../../shared/errors";
import { decrypt, encrypt, generateToken, verifyToken } from "../../../shared/utils";
import { env } from "../../../environment";
import { JwtPayload } from "jsonwebtoken";

@injectable()
export default class AuthService {
    constructor(
        private userRepository: UserRepository
    ){

    }

    async register(args: RegisterUserInput): Promise<RegisterUserOutput> {

        const { email, password } = args;
        
        const existingUser = await this.userRepository.findUserByEmail(email);

        if(existingUser){
            throw new BadRequestError("email already exists", {
                email,
                timestamp: new Date()
            });
        }

        const hashedPassword = await encrypt(password);

        await this.userRepository.addUser({
            ...args,
            password: hashedPassword
        });

        return {
            isSuccessful: true
        }
    }

    async login(args: LoginUserInput): Promise<LoginUserOutput> {

        const { email, password } = args;

        const existingUser = await this.userRepository.findUserByEmail(email);

        if(!existingUser){
            throw new BadRequestError("email/password is incorrect ", {
                email,
                timestamp: new Date()
            });
        }

        const verifyPassword = await decrypt(password, existingUser.password);

        if(!verifyPassword){
            throw new BadRequestError("email/password is incorrect ", {
                email,
                timestamp: new Date()
            });
        }

        const accessToken = await generateToken({
            id: existingUser._id
        }, env.JWT_SECRET);

        const refreshToken = await generateToken({
            id: existingUser._id
        }, env.JWT_SECRET, '24h');

        await this.userRepository.setRefreshToken(existingUser._id, refreshToken);
        
        return {
            accessToken,
            refreshToken
        }
    }

    async refreshToken(args: RefreshTokenInput): Promise<RefreshTokenOutput> {

        const { refreshToken } = args;

        const decoded = await verifyToken(refreshToken, env.JWT_SECRET) as JwtPayload;

        const user = await this.userRepository.findUserById(decoded?.id);

        if(!user){
            throw new BadRequestError("faild to find user");
        }

        const newAccessToken = await generateToken({
            id: user._id
        }, env.JWT_SECRET);

        const newRefreshToken = await generateToken({
            id: user._id
        }, env.JWT_SECRET, '24h');

        await this.userRepository.setRefreshToken(user._id, refreshToken);
        
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        }
    }

    async logout(userId: string): Promise<void> {
        const user = await this.userRepository.findUserById(userId);
            
        if (!user) {
            throw new BadRequestError("User not found");
        }

        await this.userRepository.setRefreshToken(userId, "");
    }
}