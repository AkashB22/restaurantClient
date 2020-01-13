export interface Restaurant{
    _id: string;
    restaurantID: string;
    restaurantName: string;
    cuisine: string;
    averageCostForTwo: Number;
    currency : string;
    hasTableBooking: Boolean;
    hasOnlineDelivery: Boolean;
    aggregateRating: Number;
    ratingColor: string;
    ratingText: string;
    votes: Number;
    _v: string;
}