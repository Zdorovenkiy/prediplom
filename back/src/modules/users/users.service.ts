import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { users } from 'src/models';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UsersService implements OnModuleInit {
    private transporter;

    constructor(
        @InjectModel(users)
          private currentModel: typeof users,
    ) {}

    async onModuleInit() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }


    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    async findAll() {
        return await this.currentModel.findAll({
            attributes: { exclude: ['password'] },
            order: [['id', 'DESC']],
        });
    }

    async findOne(id: number) {
        const user = await this.currentModel.findOne({
            where: {
                id: id,
            }
        })

        return user
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.currentModel.update(updateUserDto, {
            where: { id },
        });
        return await this.currentModel.findByPk(id, {
            attributes: { exclude: ['password'] },
        });
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async register(createUserDto: CreateUserDto) {
        await this.currentModel.create({...createUserDto, role_id: 3});
    }

    async auth(email: string, password: string) {
        const user = await this.currentModel.findOne({
            where: {
                email: email,
                password: password,
            }
        })

        return user
    }

    async sendPasswordEmail(email: string) {
        try {
            const user = await this.currentModel.findOne({
                raw: true,
                where: {
                    email: email
                }
            });
            
            if (!user) return { success: false, message: 'Пользователь с таким email не найден' };

            console.log("user", user);
            

            const info = await this.transporter.sendMail({
                from: `Поддержка сайта`,
                to: email,
                subject: 'Восстановление пароля',
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Восстановление пароля</h2>
                    <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
                        <h1 style="color: #007bff; letter-spacing: 5px; margin: 0;">${user.password}</h1>
                    </div>
                </div>
                `,
            });

            return { 
                success: true, 
                message: 'Код восстановления отправлен на email'
            };
        } catch (error) {
            return { 
                success: false, 
                message: 'Ошибка при отправке email' 
            };
        }
    }

}
