import forMeTeam from '../assets/images/CategoryIllustrations/for-me-team.png';
import newThisMonth from '../assets/images/CategoryIllustrations/new-this-month.png';
import offers from '../assets/images/CategoryIllustrations/offers.png';
import products from '../assets/images/CategoryIllustrations/products.png';
import recipes from '../assets/images/CategoryIllustrations/recipes.png';
import planAParty from '../assets/images/CategoryIllustrations/plan-a-party.png';
import messagingSystems from '../assets/images/CategoryIllustrations/messaging-systems.png';
import featuredMealtime from '../assets/images/CategoryIllustrations/featured-mealtime-inspiration.png';
import engagementConversation from '../assets/images/CategoryIllustrations/engagement-and-conversation-starters.png';
import recruiting from '../assets/images/CategoryIllustrations/recruiting.png';
import liveEvents from '../assets/images/CategoryIllustrations/live-events.png';
import defaultImg from '../assets/images/CategoryIllustrations/default.png';

export const CategoryIcon = ({ id, className = "w-12 h-12" }: { id: string; className?: string }) => {
  const getImageUrl = (id: string) => {
    switch (id) {
      case 'for-me-my-team':
        return forMeTeam;
      case 'new-this-month':
        return newThisMonth;
      case 'offers':
        return offers;
      case 'products':
        return products;
      case 'recipes':
        return recipes;
      case 'plan-a-party':
        return planAParty;
      case 'host-guest-messaging':
        return messagingSystems;
      case 'featured-mealtime':
        return featuredMealtime;
      case 'engagement-conversation':
        return engagementConversation;
      case 'recruiting':
        return recruiting;
      case 'live-events':
        return liveEvents;
      default:
        return defaultImg;
    }
  };

  return (
    <img 
      src={getImageUrl(id)} 
      alt="" 
      className={`${className} object-contain`}
    />
  );
};
