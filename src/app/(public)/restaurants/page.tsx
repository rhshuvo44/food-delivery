import RestaurantsClient from "./RestaurantsClient";

interface RestaurantsPageProps {
  searchParams: Promise<{ cuisine?: string | string[] }>;
}

export default async function RestaurantsPage({ searchParams }: RestaurantsPageProps) {
  const { cuisine } = await searchParams;
  const initialCuisine = Array.isArray(cuisine) ? cuisine[0] : cuisine;

  return <RestaurantsClient initialCuisine={initialCuisine} />;
}
