export interface ReviewSummary {

    averageRating: number;
  
    totalReviews: number;
  
    ratingBreakdown: {
  
      fiveStar: number;
  
      fourStar: number;
  
      threeStar: number;
  
      twoStar: number;
  
      oneStar: number;
  
    };
  
  }