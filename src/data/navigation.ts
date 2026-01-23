export interface NavItem {
  id: string;
  label: string;
  children?: NavItem[];
}

export const navigationData: NavItem[] = [
  {
    id: 'for-me-my-team',
    label: 'For Me & My Team',
    children: [
      { id: 'new-to-pampered-chef', label: 'New to Pampered Chef?' },
      { id: 'conference', label: 'Conference' },
      { id: 'incentive-trip', label: 'Incentive Trip' },
      { id: 'recognition', label: 'Recognition' },
      { id: 'success-rewards', label: 'Success Rewards' },
      { id: 'pc-proud', label: 'PC Proud' },
      { id: 'anniversary-collection', label: 'Anniversary Collection' },
      { id: 'happy-birthday', label: 'Happy Birthday to You!' },
      { id: 'pc-logo', label: 'PC Logo' },
    ],
  },
  {
    id: 'new-this-month',
    label: 'New This Month',
  },
  {
    id: 'offers',
    label: 'Offers',
    children: [
      {
        id: 'january-2026',
        label: 'January 2026',
        children: [
          { id: 'jan-customer-offers', label: 'Customer Offers' },
          { id: 'jan-host-offers', label: 'Host Offers' },
          { id: 'jan-new-consultant-offers', label: 'New Consultant Offers' },
          { id: 'jan-consultant-rewards', label: 'Consultant Rewards' },
        ],
      },
      {
        id: 'february-2026',
        label: 'February 2026',
        children: [
          { id: 'feb-customer-offers', label: 'Customer Offers' },
          { id: 'feb-host-offers', label: 'Host Offers' },
          { id: 'feb-consultant-rewards', label: 'Consultant Rewards' },
          { id: 'feb-new-consultant-offers', label: 'New Consultant Offers' },
        ],
      },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    children: [
      { id: 'new-products', label: 'New Products' },
      { id: 'kids-club', label: 'Kids Club' },
      { id: 'anniversary-collection-products', label: 'Anniversary Collection' },
      { id: 'bakeware', label: 'Bakeware' },
      { id: 'cookware', label: 'Cookware' },
      { id: 'entertaining', label: 'Entertaining' },
      { id: 'kitchen-tools', label: 'Kitchen Tools' },
      { id: 'pantry', label: 'Pantry' },
      { id: 'small-appliances', label: 'Small Appliances' },
      { id: 'stoneware', label: 'Stoneware' },
      { id: 'product-images', label: 'Product Images' },
    ],
  },
  {
    id: 'recipes',
    label: 'Recipes',
    children: [
      { id: 'all-recipes', label: 'All Recipes' },
      { id: 'new-recipes', label: 'New Recipes' },
      { id: 'appetizers-snacks', label: 'Appetizers & Snacks' },
      { id: 'beverages', label: 'Beverages' },
      { id: 'breakfast-brunch', label: 'Breakfast & Brunch' },
      { id: 'desserts', label: 'Desserts' },
      { id: 'main-dishes', label: 'Main Dishes' },
      { id: 'side-dishes', label: 'Side Dishes' },
    ],
  },
  {
    id: 'plan-a-party',
    label: 'Plan A Party',
    children: [
      { id: 'cover-images', label: 'Cover Images' },
      { id: 'fundraising', label: 'Fundraising' },
      { id: 'host-rewards', label: 'Host Rewards' },
      { id: 'promote-table', label: 'Promote Table' },
      { id: 'texting-parties', label: 'Texting Parties' },
      { id: 'host-coaching', label: 'Host Coaching' },
      { id: 'party-updates', label: 'Party Updates' },
      { id: 'outside-order-forms', label: 'Outside Order Forms' },
      { id: 'in-person-party', label: 'In-Person Party' },
      { id: 'wedding-registry', label: 'Wedding & Registry' },
    ],
  },
  {
    id: 'host-guest-messaging',
    label: 'Host & Guest Messaging System',
    children: [
      { id: 'host-coaching-before', label: 'Host Coaching: Before the Pop-Up' },
      { id: 'host-coaching-during', label: 'Host Coaching: During the Pop-Up' },
      { id: 'guest-connection', label: 'Guest Connection' },
      { id: 'engagement-responses', label: 'Engagement Responses' },
      { id: 'how-to-use', label: 'How to Use this System' },
    ],
  },
  {
    id: 'featured-mealtime',
    label: 'Featured Mealtime Inspiration',
    children: [
      { id: 'winter-warmup', label: 'Winter Warm-Up Theme' },
      { id: 'fun-games', label: 'Fun & Games' },
      { id: 'smart-swaps', label: 'Smart Swaps' },
      { id: 'breakfast-made-easier', label: 'Breakfast Made Easier' },
      { id: 'kids-cooking-helpers', label: 'Kids Cooking Helpers' },
      { id: 'top-picks-soups', label: 'Top Picks for Soups & Chilis' },
      { id: 'winning-tools-game-day', label: 'Winning Tools for Game Day' },
      { id: 'must-haves-cleanup', label: 'Must-Haves for Easy Cleanup' },
      { id: 'soothing-sips', label: 'Soothing Sips' },
      { id: 'tools-meal-prep', label: 'Tools for Easy Meal Prep' },
      { id: 'date-night', label: 'Date Night at Home' },
    ],
  },
  {
    id: 'engagement-conversation',
    label: 'Engagement & Conversation Starters',
    children: [
      { id: 'tips-hacks', label: 'Tips & Hacks' },
      { id: 'conversation-starters', label: 'Conversation Starters' },
      { id: 'fun-games-engagement', label: 'Fun & Games' },
    ],
  },
  {
    id: 'recruiting',
    label: 'Recruiting',
    children: [
      { id: 'who-is-pc', label: 'Who is Pampered Chef' },
      { id: 'benefits', label: 'Benefits of Being a Consultant' },
      { id: 'new-consultant-kit', label: 'New Consultant Kit' },
    ],
  },
  {
    id: 'live-events',
    label: 'Live Events',
    children: [
      { id: 'promote-live-events', label: 'Promote Live Events' },
      { id: 'handouts', label: 'Handouts' },
      { id: 'kids-club-cooking', label: 'Kids Club Cooking Class' },
    ],
  },
];
