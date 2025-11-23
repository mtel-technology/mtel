import m1Image from '../assets/m1-render.png';
import m10Image from '../assets/m10-render.png';
import m1TypeCImage from '../assets/m1-typec.png';

export const products = [
    {
        id: 'm1',
        name: 'MTEL M1',
        tagline: 'Compact. Reliable. Powerful.',
        description: 'Compact and reliable smartphone with essential features for everyday use.',
        price: '3,299',
        image: m1Image,
        specs: [
            '1.77" Display',
            '1000mAh Battery',
            'FM Radio',
            'Bluetooth',
            'Dual Sim'
        ],
        badge: 'Best Seller',
        isNew: false
    },
    {
        id: 'm10',
        name: 'MTEL M10',
        tagline: 'Advanced smartphone with larger display.',
        description: 'High-performance Processor, High-speed 5G.',
        price: 'Coming Soon',
        image: m10Image,
        specs: [
            '2.4" Display',
            '2500mAh Battery',
            'FM Radio',
            'Bluetooth',
            'Triple Sim'
        ],
        badge: 'Coming Soon',
        isNew: true
    },
    {
        id: 'm1-type-c',
        name: 'MTEL M1 Type-C',
        tagline: 'The classic M1, now upgraded.',
        description: 'Now upgraded with Type-C charging and call recording.',
        price: 'Coming Soon',
        image: m1TypeCImage,
        specs: [
            '1.77" Display',
            '1020mAh Battery',
            'Type-C Port',
            'Call Recording'
        ],
        badge: 'New Edition',
        isNew: true
    }
];
