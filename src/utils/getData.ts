// src/utils/getData.ts
'use client';

import EngageService from '@/app/_api/engage';
import type { Product } from '@/types';


interface PersonalizationResponse {
  component?: {
    type?: string;
    layout?: string;
  };
}

export async function getMenuData() {
  let menuVariant = 'standard-menu';  // default

  try {
    const engage = await EngageService.getInstance();

    if (engage) {
      // Get time from localStorage, default to current hour if not set
      const timeOfDay = localStorage.getItem('kfcTimeOfDay') || new Date().getHours().toString();

      const response = await engage.personalize({
        channel: "WEB",
        currency: "GBP",
        pointOfSale: "SomeDemo",
        friendlyId: "kfc__menu_categories_ordering_1",
        params: {
          timeOfDay: parseInt(timeOfDay)
        }
      }) as PersonalizationResponse;

      if (response?.component?.layout) {
        menuVariant = response.component.layout;
      }
    }
  } catch (error) {
    console.error('Error fetching personalized menu:', error);
  }

  // Default menu order
  const standardCategories = [
    { id: 'recommended', name: 'RECOMMENDED' },
    { id: 'sharing-buckets', name: 'SHARING BUCKETS' },
    { id: 'box-meals', name: 'BOX MEALS' },
    { id: 'drinks', name: 'DRINKS' },
    { id: 'burgers', name: 'BURGERS' },
    { id: 'sides-dips', name: 'CLASSIC SIDES & DIPS' },
    { id: 'vegan', name: 'VEGAN' },
    { id: 'buckets-for-one', name: 'BUCKETS FOR ONE' },
    { id: 'twister-wraps', name: 'TWISTER WRAPS' },
    { id: 'riceboxes', name: 'RICEBOXES & SALADS' },
    { id: 'kentucky-savers', name: 'KENTUCKY SAVERS' },
    { id: 'just-chicken', name: 'JUST CHICKEN' }
]

  // Morning menu - drinks higher up
  const coffeeFocusedCategories = [
    { id: 'recommended', name: 'RECOMMENDED' },
    { id: 'drinks', name: 'DRINKS' },
    { id: 'box-meals', name: 'BOX MEALS' },
    { id: 'kentucky-savers', name: 'KENTUCKY SAVERS' },
    { id: 'burgers', name: 'BURGERS' },
    { id: 'riceboxes', name: 'RICEBOXES & SALADS' },
    { id: 'vegan', name: 'VEGAN' },
    { id: 'twister-wraps', name: 'TWISTER WRAPS' },
    { id: 'buckets-for-one', name: 'BUCKETS FOR ONE' },
    { id: 'just-chicken', name: 'JUST CHICKEN' },
    { id: 'sides-dips', name: 'CLASSIC SIDES & DIPS' },
    { id: 'sharing-buckets', name: 'SHARING BUCKETS' }
]

  // Evening menu - family meals higher up
  const familyFocusedCategories = [
    { id: 'recommended', name: 'RECOMMENDED' },
    { id: 'buckets-for-one', name: 'BUCKETS FOR ONE' },
    { id: 'burgers', name: 'BURGERS' },
    { id: 'drinks', name: 'DRINKS' },
    { id: 'kentucky-savers', name: 'KENTUCKY SAVERS' },
    { id: 'twister-wraps', name: 'TWISTER WRAPS' },
    { id: 'box-meals', name: 'BOX MEALS' },
    { id: 'vegan', name: 'VEGAN' },
    { id: 'riceboxes', name: 'RICEBOXES & SALADS' },
    { id: 'just-chicken', name: 'JUST CHICKEN' },
    { id: 'sides-dips', name: 'CLASSIC SIDES & DIPS' },
    { id: 'sharing-buckets', name: 'SHARING BUCKETS' }
]

  const getMenuCategories = (variant: string) => {
    switch (variant) {
      case 'coffee-focused-menu':
        return coffeeFocusedCategories;
      case 'family-meal-focus-menu':
        return familyFocusedCategories;
      default:
        return standardCategories;
    }
  };

  const products: Product[] = [
    // RECOMMENDED
    {
      id: 'rec-1',
      name: 'Boneless Banquet',
      price: 9.99,
      description: '3 Mini Fillets, small Popcorn chicken, regular Signature fries & your choice of side. Plus one Original Recipe dip.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/a6b59690-9f73-4213-a996-f68b35f0a538.jpg',
      category: 'recommended',
      calories: '840kcal',
    },
    {
      id: 'rec-2',
      name: 'Zinger Stacker',
      price: 7.99,
      description: 'Double the kick with 2 spicy Zinger Fillets with 2 slices of cheese, Supercharger & sweet chilli sauce.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/d7e70b33-f3cc-49b0-a70d-3e4fde25b876.jpg',
      category: 'recommended',
      calories: '780kcal',
    },

    // DRINKS 

    {
      id: 'drink-3',
      name: 'Latte',
      price: 2.29,
      description: 'A tall milky coffee. Freshly ground, 100% Arabica Beans.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/aa382615-cd86-436a-be65-b07b5feb186d.jpg',
      category: 'drinks',
      calories: '15kcal',
    },

    {
      id: 'drink-2',
      name: 'Americano',
      price: 2.29,
      description: 'Rich espresso topped with hot water',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/4de5bbd4-9aa2-4191-b25d-750e22134338.jpg',
      category: 'drinks',
      calories: '15kcal',
    },

    {
      id: 'drink-1',
      name: 'Pepsi',
      price: 1.99,
      description: 'Ice-cold Pepsi',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/9b50dd1a-ad7b-419f-abab-04488bbfb88c.jpg',
      category: 'drinks',
      calories: '150kcal',
    },
   

    // SHARING BUCKETS
    {
      id: 'bucket-1',
      name: 'Bargain Bucket: 10 pc',
      price: 18.99,
      description: '10 pieces of our famous Original Recipe chicken with 4 regular Signature fries. Serious bang for you.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/00eb2db4-5040-485d-a28c-9aa996509ec5.jpg',
      category: 'sharing-buckets',
      calories: '1200kcal',
    },
    {
      id: 'bucket-2',
      name: 'Family Feast: 6 pc',
      price: 18.99,
      description: '6 pieces of our famous Original Recipe chicken, 4 regular Signature fries, 2 large sides & a large bottle drink.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/50cc1826-eb59-4f6a-af47-5cb23a576eac.jpg',
      category: 'sharing-buckets',
      calories: '1100kcal',
    },
    {
      id: 'bucket-3',
      name: 'Party Bucket',
      price: 34.99,
      description: '14 pieces of Original Recipe chicken, 8 Hot Wings, 8 Mini Fillets, large Popcorn chicken, 6 regular fries.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/ea6c7eed-fe59-4965-8a6b-68691a959af5.jpg',
      category: 'sharing-buckets',
      calories: '2400kcal',
    },

    // BOX MEALS
    {
      id: 'box-1',
      name: 'Trilogy Box Meal',
      price: 9.99,
      description: 'Fiery Zinger Burger, Mini Fillet, small Popcorn chicken, regular Signature fries & your choice of side.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/a7af2847-e7b7-4d8d-8ed0-ba486dfd4d7c.jpg',
      category: 'box-meals',
      calories: '950kcal',
    },
    {
      id: 'box-2',
      name: 'Zinger Box Meal',
      price: 8.99,
      description: 'Zinger Burger plus 2 fiery Hot Wings, regular Signature fries, your choice of side & a drink.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/967a3807-f40d-432f-a8bc-32eb4021ecf1.jpg',
      category: 'box-meals',
      calories: '870kcal',
    },

    // BURGERS
    {
      id: 'burger-1',
      name: 'Zinger Tower Burger',
      price: 6.99,
      description: 'A fiery Zinger Fillet Burger topped with hash brown, cheese & spicy Supercharger sauce.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/fba5eaef-b639-4228-a6e4-0a75123d1178.jpg',
      category: 'burgers',
      calories: '750kcal',
    },
    {
      id: 'burger-2',
      name: 'BBQ Fillet Tower Burger',
      price: 6.99,
      description: 'Original Recipe Fillet Burger topped with crispy hashbrown, cheese and smoky BBQ sauce.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/55ed8946-d18c-4ca0-868c-b232e1e13301.jpg',
      category: 'burgers',
      calories: '730kcal',
    },
    {
      id: 'burger-3',
      name: 'Fillet Burger',
      price: 5.99,
      description: 'Original Recipe Fillet Burger. You cant go wrong.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/d77d39b8-0261-4218-b8b4-5f2fe1636d91.jpg',
      category: 'burgers',
      calories: '475kcal',
    },

    // VEGAN
    {
      id: 'vegan-1',
      name: 'Vegan Burger',
      price: 5.99,
      description: 'Quorn fillet coated in our famous 11 herbs & spices in a sesame bun with lettuce & vegan mayo.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/8c6c3895-cd43-4fe1-aba8-ad3f047e8cf4.jpg',
      category: 'vegan',
      calories: '450kcal',
    },

    // BUCKETS FOR ONE
    {
      id: 'single-1',
      name: 'Mighty Bucket For One',
      price: 9.99,
      description: '2 pieces of Original Recipe chicken, 2 Mini Fillets & 2 hot wings, regular fries, side and drink.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/a5558af3-3efa-478d-9b76-551686f110f9.jpg',
      category: 'buckets-for-one',
      calories: '1050kcal',
    },

    // TWISTER WRAPS
    {
      id: 'wrap-1',
      name: 'Twister Wrap',
      price: 5.99,
      description: 'An Original Recipe fillet with crunchy pickled slaw and your choice of sauce, wrapped in a lightly toasted tortilla.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/d6902a66-5ba8-4944-940b-428587f0882e.jpg',
      category: 'twister-wraps',
      calories: '480kcal',
    },

    // RICEBOXES & SALADS
    {
      id: 'rice-1',
      name: 'Original Recipe Ricebox',
      price: 5.49,
      description: 'An Original Recipe chicken Fillet with spicy rice, lettuce & bean salsa, drizzled with buttermilk dressing.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/83e8767c-37ee-49f1-b485-e757ad67d602.jpg',
      category: 'riceboxes',
      calories: '520kcal',
    },

    // KENTUCKY SAVERS
    {
      id: 'saver-1',
      name: 'Mini Fillet Burger',
      price: 1.99,
      description: 'Our Mini Fillet burger with lettuce & pepper mayo. Ideal for little appetites.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/cff77764-4a7d-41a7-888f-720961ef99af.jpg',
      category: 'kentucky-savers',
      calories: '280kcal',
    },

    // JUST CHICKEN
    {
      id: 'chicken-1',
      name: 'Hot Wings: 6 pc',
      price: 4.99,
      description: '6 spicy Hot Wings. The perfect spicy snack.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/94a07199-9dbb-48e2-858e-9b2a1912574a.jpg',
      category: 'just-chicken',
      calories: '390kcal',
    },
    {
      id: 'chicken-2',
      name: 'Popcorn Chicken',
      price: 4.99,
      description: 'Regular portion of our Popcorn chicken pieces. Get poppin.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/5f6562d1-e4eb-47a8-9313-2064a69c3cfd.jpg',
      category: 'just-chicken',
      calories: '285kcal',
    },

    //SIDES & DIPS

    {
      id: 'regular-signature-fries',
      name: 'Regular Signature Fries',
      price: 2.19,
      description: 'We’ve seasoned the King of all sides.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/8a2d3f1c-d6f0-4276-b7b5-4ceb82eecd05.jpg',
      category: 'sides-dips',
      calories: '285kcal',
    },
    {
      id: 'corn-cob-1-pc',
      name: 'Corn Cob: 1 pc',
      price: 1.99,
      description: 'A golden cob of delicious corn. Sweet & juicy.',
      image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/c2aca632-c729-4843-bd04-1feadf626f50.jpg',
      category: 'sides-dips',
      calories: '285kcal',
    }
  ];

  return {
    categories: getMenuCategories(menuVariant),
    products,
  };
}
