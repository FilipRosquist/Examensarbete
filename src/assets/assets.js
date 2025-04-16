import logo from './logo.svg'
import logo_dark from './logo_dark.svg'
import cross_icon from './cross_icon.svg'
import menu_icon from './menu_icon.svg'
import star_icon from './star_icon.svg'
import left_arrow from './left_arrow.svg'
import right_arrow from './right_arrow.svg'
import header_img from '/header_img.png'
import header from '/header.jpg'
import brand_img from './brand_img.png'
import product1 from './product1.png'
import product2 from './product2.png'
import product3 from './product3.png'
import product4 from './product4.png'
import product5 from './product5.png'
import product6 from './product6.png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_img_3 from './profile_img_3.png'
import logoPanEl from './logoPanEl.png'
import logoSmall from './logoSmall.png'
import smallIcon from './smallIcon.ico'

export const assets = {
    logo,
    logo_dark,
    logoPanEl,
    logoSmall,
    smallIcon,
    cross_icon,
    menu_icon,
    star_icon,
    header_img,
    header,
    brand_img,
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    left_arrow,
    right_arrow,
}

export const productsData = [
    {
      title: "Water Powered Brush",
      price: "$69.99",
      image: product1
    },
    {
      title: "Installation Tool",
      price: "$49.00",
      image: product2
    },
    {
      title: "Solar Powered Brush",
      price: "$299.00",
      image: product3
    },
    {
      title: "Cleaning Kit",
      price: "$79.99",
      image: product4
    },
    {
      title: "Suction Cup",
      price: "$99.99",
      image: product5
    },
    {
      title: "Solar Tool Roller",
      price: "$149.99",
      image: product6
    },
    
  ];

  export const reviewData = [
    {
        name: "Michael Nelson",
        title: "Marketing Manager",
        image: profile_img_1,
        alt: "Portrait of Donald Jackman",
        rating: 5,
        text: "Pan-El made switching to solar effortless. The team was professional, fast, and left everything spotless. I'm already seeing savings on my energy bill!"
    },
    {
        name: "Simon West",
        title: "Nurse",
        image: profile_img_2,
        alt: "Portrait of Richard Nelson",
        rating: 4,
        text: "From consultation to installation, Pan-El exceeded expectations. They explained every step and had the panels up in just two days. Highly recommend!"
    },
    {
        name: "Ryan Larson",
        title: "Sales Director",
        image: profile_img_3,
        alt: "Portrait of James Washington",
        rating: 5,
        text: "Fantastic experience! The installers were punctual and polite, and the system works like a charm. Great value for the quality of service."
    }
];