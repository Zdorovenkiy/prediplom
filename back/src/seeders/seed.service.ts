
import { Injectable, OnModuleInit } from '@nestjs/common';
import { users } from '../models/users';
import { roles } from '../models/roles'; 
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
                    title: 'Курс "Fullstack JavaScript разработка"',
                    description: 'Полный курс по JavaScript, React, Node.js и MongoDB. С нуля до уровня Middle разработчика. Включает 150+ часов видео, 50+ практических заданий и дипломный проект.',
                    price: 299.99,
                    stock: 1000, 
                    description_short: 'От новичка до Middle за 6 месяцев',
                    is_discount: true,
                    category: 'courses',
                    discount_price: 199.99
                },
                {
                    title: 'Python для Data Science и анализа данных',
                    description: 'Изучите Python, библиотеки Pandas, NumPy, Matplotlib и Scikit-learn. Научитесь визуализировать данные и строить модели машинного обучения.',
                    price: 249.99,
                    stock: 1000,
                    description_short: 'Data Science с нуля',
                    is_discount: false,
                    category: 'courses'
                },
                {
                    title: 'Веб-дизайн и Figma с нуля',
                    description: 'Курс по современному веб-дизайну, UX/UI, работе в Figma. Создание прототипов, дизайн-систем и портфолио для начинающих дизайнеров.',
                    price: 179.99,
                    stock: 1000,
                    description_short: 'UI/UX дизайн в Figma',
                    is_discount: true,
                    category: 'courses',
                    discount_price: 129.99
                },
                {
                    title: 'Курс по мобильной разработке на Flutter',
                    description: 'Разработка кросс-платформенных мобильных приложений на Flutter и Dart. Создание приложений для iOS и Android с единой кодовой базой.',
                    price: 329.99,
                    stock: 1000,
                    description_short: 'Flutter для iOS и Android',
                    is_discount: false,
                    category: 'courses'
                },
                {
                    title: 'DevOps: Docker, Kubernetes, CI/CD',
                    description: 'Полный курс по DevOps практикам. Контейнеризация, оркестрация, автоматизация развертывания и мониторинг приложений.',
                    price: 399.99,
                    stock: 1000,
                    description_short: 'DevOps с нуля до практики',
                    is_discount: true,
                    category: 'courses',
                    discount_price: 299.99
                },
                {
                    title: 'Английский для IT-специалистов',
                    description: 'Специализированный курс английского языка для программистов. Техническая лексика, интервью в международные компании, документация.',
                    price: 149.99,
                    stock: 1000,
                    description_short: 'Английский для IT',
                    is_discount: false,
                    category: 'courses'
                },
                {
                    title: 'Основы кибербезопасности и Ethical Hacking',
                    description: 'Курс по основам информационной безопасности. Тестирование на проникновение, защита веб-приложений, безопасность сетей.',
                    price: 279.99,
                    stock: 1000,
                    description_short: 'Кибербезопасность с нуля',
                    is_discount: true,
                    category: 'courses',
                    discount_price: 199.99
                },
                {
                    title: 'Курс по SQL и базам данных',
                    description: 'Глубокое погружение в SQL, проектирование баз данных, оптимизация запросов. PostgreSQL, MySQL, индексы и транзакции.',
                    price: 159.99,
                    stock: 1000,
                    description_short: 'SQL для разработчиков',
                    is_discount: false,
                    category: 'courses'
                },
                {
                    title: 'Разработка игр на Unity для начинающих',
                    description: 'Создание 2D и 3D игр на движке Unity. C# программирование, физика, анимация, публикация игр на платформах.',
                    price: 229.99,
                    stock: 1000,
                    description_short: 'GameDev на Unity',
                    is_discount: true,
                    category: 'courses',
                    discount_price: 179.99
                },
                {
                    title: 'SMM и продвижение в социальных сетях',
                    description: 'Стратегии продвижения бизнеса в соцсетях. Контент-план, таргетированная реклама, аналитика и увеличение вовлеченности.',
                    price: 199.99,
                    stock: 1000,
                    description_short: 'Продвижение в соцсетях',
                    is_discount: false,
                    category: 'courses'
                },
                {
                    title: 'Машинное обучение и нейросети',
                    description: 'Продвинутый курс по ML и глубокому обучению. TensorFlow, PyTorch, компьютерное зрение и обработка естественного языка.',
                    price: 449.99,
                    stock: 1000,
                    description_short: 'Нейросети и глубокое обучение',
                    is_discount: true,
                    category: 'courses',
                    discount_price: 349.99
                },
                {
                    title: 'Проектный менеджмент в IT',
                    description: 'Agile, Scrum, Kanban методологии. Управление IT-проектами, планирование, оценка сроков и контроль качества.',
                    price: 269.99,
                    stock: 1000,
                    description_short: 'Управление IT-проектами',
                    is_discount: false,
                    category: 'courses'
                },
                {
                    title: 'Тестирование ПО (QA)',
                    description: 'Ручное и автоматизированное тестирование. Selenium, Postman, написание тест-кейсов, баг-репорты и CI/CD для тестов.',
                    price: 189.99,
                    stock: 1000,
                    description_short: 'QA Engineer с нуля',
                    is_discount: true,
                    category: 'courses',
                    discount_price: 139.99
                },
                {
                    title: 'Blockchain и разработка смарт-контрактов',
                    description: 'Основы блокчейна, криптовалюты, разработка смарт-контрактов на Solidity. Создание DApp на Ethereum.',
                    price: 379.99,
                    stock: 1000,
                    description_short: 'Blockchain разработка',
                    is_discount: false,
                    category: 'courses'
                }
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
                        image: 'https://i0.wp.com/antitreningi.ru/info/wp-content/uploads/2021/06/sozdanie-onlajn-kursa.png?w=1000&ssl=1',
                    },
                    {
                        product_id: 2,
                        image: 'https://academy.promo/blog/32.jpg',
                    },
                    {
                        product_id: 2,
                        image: 'https://vse-kursy.com/uploads/posts/2021-02/1612274903_free-kursy-1.jpg',
                    },
                    {
                        product_id: 3,
                        image: 'https://rsv.ru/blog/wp-content/uploads/2021/09/onlajn-kurs-918x516.jpg',
                    },
                    {
                        product_id: 3,
                        image: 'https://www.hse.ru/data/2017/05/17/1171367341/3iStock-610454902.jpg',
                    },
                    {
                        product_id: 4
                    },
                    {
                        product_id: 5,
                        image: 'https://cdn.lifehacker.ru/wp-content/uploads/2019/08/vlv_1566390570-784x368.jpg',
                    },
                    {
                        product_id: 5,
                        image: 'https://meridian.lv/wp-content/uploads/2021/11/meridian-web-1000-x-667.jpg'
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