// src/seeders/seed.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { users } from '../models/users';
import { roles } from '../models/roles'; // если есть модель roles
import { product_images, products } from 'src/models';

@Injectable()
export class SeedService implements OnModuleInit {
    async onModuleInit() {
        await this.seedUsers();
        await this.seedRoles();
        await this.seedProduct();
        await this.seedProductImages();
    }

    async seedUsers() {
        try {
            const count = await users.count();
            if (count === 0) {

                const test = [
                    {
                        surname: "Иванов",
                        name: "Иван",
                        patronymic: "Иванович",
                        email: "test@example.com",
                        password: "1234",
                        role_id: 1,
                        phone: "+79991234567"
                    },
                    {
                        surname: "Петров",
                        name: "Петр",
                        patronymic: "Петрович",
                        email: "test1@example.com",
                        password: "123456",
                        role_id: 2,
                        phone: "+79991234511"
                    },
                    {
                        surname: "Сергеев",
                        name: "Сергей",
                        patronymic: "Сергеевич",
                        email: "test2@example.com",
                        password: "12345678",
                        role_id: 3,
                        phone: "+79991234533"
                    }
                ];
                
                await users.bulkCreate(test);
                console.log('Тестовые данные созданы');
            }
        } catch (error) {
            console.error('Ошибка при создании тестовых данных:', error);
        }
    }

    async seedRoles() {
        try {
            const count = await roles.count();
            if (count === 0) {

                const test = [
                    {
                        id: 1,
                        name: "Админ"
                    },
                    {
                        id: 2,
                        name: "Менеджер"
                    },
                    {
                        id: 3,
                        name: "Пользователь"
                    },
                ];
                
                await roles.bulkCreate(test);
                console.log('Тестовые данные созданы');
            }
        } catch (error) {
            console.error('Ошибка при создании тестовых данных:', error);
        }
    }

    async seedProduct() {
        try {
            const count = await products.count();
            if (count === 0) {

                const test = [
                    {
                        title: 'Смартфон Samsung Galaxy S23',
                        description: 'Флагманский смартфон с AMOLED-дисплеем и мощной камерой.',
                        price: 899.99,
                        stock: 25,
                        description_short: 'Флагман Samsung',
                        is_discount: true
                    },
                    {
                        title: 'Ноутбук Lenovo ThinkPad X1',
                        description: 'Бизнес-ноутбук с высокой производительностью.',
                        price: 1499.00,
                        stock: 10,
                        description_short: 'Бизнес-класс',
                        is_discount: false,
                    },
                    {
                        title: 'Наушники Sony WH-1000XM5',
                        description: 'Беспроводные наушники с активным шумоподавлением.',
                        price: 349.90,
                        stock: 40,
                        description_short: 'Шумоподавление',
                        is_discount: true,
                    },
                    {
                        title: 'Игровая мышь Logitech G Pro',
                        description: 'Профессиональная игровая мышь для киберспорта.',
                        price: 129.50,
                        stock: 60,
                        description_short: 'Для игр',
                        is_discount: false,
                    },
                    {
                        title: 'Монитор LG UltraGear 27"',
                        description: 'Игровой монитор 165 Гц с IPS-матрицей.',
                        price: 429.99,
                        stock: 15,
                        description_short: '165 Гц IPS',
                        is_discount: true,
                    },
                ];
                
                await products.bulkCreate(test);
                console.log('Тестовые данные созданы');
            }
        } catch (error) {
            console.error('Ошибка при создании тестовых данных:', error);
        }
    }

    async seedProductImages() {
        try {
            const count = await product_images.count();
            if (count === 0) {

                const test = [
                    {
                        product_id: 1,
                        image: 'https://navitoys.ru/uploads/media/navitoys/b3/64/samsung_galaxy_s23_kremovyj.jpg',
                    },
                    {
                        product_id: 2,
                        image: 'https://navitoys.ru/uploads/media/navitoys/ac/c1/16_2_noutbuk_apple_macbook_pro_late_2021_space_gray_1.jpg',
                    },
                    {
                        product_id: 2,
                        image: 'https://navitoys.ru/uploads/media/navitoys/0f/eb/1.jpg',
                    },
                    {
                        product_id: 3,
                        image: 'https://navitoys.ru/uploads/media/navitoys/9b/1a/sony_wh_1000xm4_midnight_blue_1.jpg',
                    },
                    {
                        product_id: 3,
                        image: 'https://navitoys.ru/uploads/media/navitoys/ac/f2/sony_wh_1000xm4_midnight_blue_3.jpg',
                    },
                    {
                        product_id: 4
                    },
                    {
                        product_id: 5,
                        image: 'https://navitoys.ru/uploads/media/navitoys/f2/7c/apple_imac_24_4_5k_2023_yellow_1.jpg',
                    },
                    {
                        product_id: 5,
                        image: 'https://navitoys.ru/uploads/media/navitoys/8e/42/apple_imac_24_4_5k_2023_yellow_2.jpg',
                    },
                ];

                await product_images.bulkCreate(test);
                console.log('Тестовые данные созданы');
            }
        } catch (error) {
            console.error('Ошибка при создании изображений:', error);
        }
    }

}