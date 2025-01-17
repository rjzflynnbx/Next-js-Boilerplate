import React from 'react';
import { Star, Heart, Award, Zap } from 'lucide-react';

type MenuItem = {
  name: string;
  description: string;
  points: number;
  image: string;
};

type RewardItem = {
  name: string;
  pointsNeeded: number;
  description: string;
};

type LoyalCustomerContent = {
  points: number;
  pointsToNext: number;
  favorites: MenuItem[];
  rewards: RewardItem[];
};

type HealthyCustomerContent = {
  points: number;
  pointsToNext: number;
  recommendations: MenuItem[];
  healthyRewards: RewardItem[];
};

type UserType = 'loyal' | 'healthy';

interface JustForYouProps {
  userType?: UserType;
}

const JustForYou: React.FC<JustForYouProps> = ({ userType = 'loyal' }) => {
  const loyalCustomerContent: LoyalCustomerContent = {
    points: 2450,
    pointsToNext: 550,
    favorites: [
      {
        name: "Zinger Tower Burger",
        description: "Your most ordered item! Last ordered 3 days ago",
        points: 1200,
        image: "https://assets.kfcapi.com//fit-in/640x0/api/product/613ef50a-648e-40d0-81bf-42f2fa39d4e4.jpg"
      },
      {
        name: "Mighty Bucket For One",
        description: "A classic choice you love",
        points: 1800,
        image: "https://assets.kfcapi.com//fit-in/640x0/api/product/a5558af3-3efa-478d-9b76-551686f110f9.jpg"
      }
    ],
    rewards: [
      {
        name: "Free Original Recipe Chicken",
        pointsNeeded: 2000,
        description: "Redeem your points for your favorite chicken!"
      },
      {
        name: "Free Hot Wings Side",
        pointsNeeded: 1000,
        description: "Perfect addition to your next meal"
      }
    ]
  };

  const healthyCustomerContent: HealthyCustomerContent = {
    points: 1850,
    pointsToNext: 150,
    recommendations: [
      {
        name: "Veggie Ricebox",
        description: "Fresh vegetables, rice, and our signature sauce. Only 385 calories!",
        points: 1200,
        image: "https://assets.kfcapi.com//fit-in/640x0/api/product/c00256ed-7615-40dc-9ff5-38519b9d9c42.jpg"
      },
      {
        name: "Original Recipe Salad Box",
        description: "High protein, low carb option with fresh greens",
        points: 1400,
        image: "https://assets.kfcapi.com//fit-in/640x0/api/product/800e3ad6-4b22-4bcd-a832-fe0c2948e0f9.jpg"
      }
    ],
    healthyRewards: [
      {
        name: "Free Side Salad",
        pointsNeeded: 800,
        description: "Fresh, crispy, and healthy!"
      },
      {
        name: "Free Grilled Chicken Piece",
        pointsNeeded: 1200,
        description: "High-protein, low-fat option"
      }
    ]
  };

  const content = userType === 'loyal' ? loyalCustomerContent : healthyCustomerContent;

  // Helper function to get the correct items array based on user type
  const getItems = () => {
    if (userType === 'loyal') {
      return loyalCustomerContent.favorites;
    }
    return healthyCustomerContent.recommendations;
  };

  // Helper function to get the correct rewards array based on user type
  const getRewards = () => {
    if (userType === 'loyal') {
      return loyalCustomerContent.rewards;
    }
    return healthyCustomerContent.healthyRewards;
  };

  return (
    <div className="w-full pb-8">
      {/* Points Overview */}
      <div className="mb-6 bg-red-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">
              {userType === 'loyal' ? 'Your KFC Rewards' : 'Your KFC Rewards'}
            </h2>
          </div>
          <span className="px-4 py-1 rounded-full text-white bg-red-600">
            {content.points} Points
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Zap className="w-4 h-4" />
          <span>Only {content.pointsToNext} points until your next reward!</span>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-600" />
          {userType === 'loyal' ? 'Your Favorites' : 'Your Favorites'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getItems().map((item, index) => (
            <div key={index} className="bg-white rounded-lg border">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h4 className="font-bold mb-1">{item.name}</h4>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-medium">
                    {item.points} points
                  </span>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    Add to Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Rewards */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Available Rewards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getRewards().map((reward, index) => (
            <div key={index} className="bg-white rounded-lg border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold mb-1">{reward.name}</h4>
                  <p className="text-gray-600 text-sm">{reward.description}</p>
                </div>
                <span className="text-gray-600">
                  {reward.pointsNeeded} points
                </span>
              </div>
              <button
                className={`w-full mt-4 py-2 rounded text-white ${
                  content.points >= reward.pointsNeeded
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={content.points < reward.pointsNeeded}
              >
                {content.points >= reward.pointsNeeded ? 'Redeem Now' : 'Not Enough Points'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JustForYou;