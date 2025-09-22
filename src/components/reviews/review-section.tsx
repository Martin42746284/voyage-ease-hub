import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, ThumbsUp, Flag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const reviewSchema = z.object({
  rating: z.number().min(1, "Veuillez donner une note").max(5, "Note maximale : 5"),
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
  comment: z.string().min(10, "Le commentaire doit contenir au moins 10 caractères"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  stayType: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Marie Dubois",
    rating: 5,
    title: "Séjour parfait en famille",
    comment: "Hôtel magnifique avec une vue imprenable sur l'océan. Le personnel est aux petits soins et les chambres sont spacieuses et propres. Le restaurant propose une excellente cuisine locale. Je recommande vivement !",
    date: "2024-01-15",
    helpful: 8,
    stayType: "Famille"
  },
  {
    id: "2",
    userName: "Jean Martin",
    rating: 4,
    title: "Très bon rapport qualité-prix",
    comment: "Hôtel bien situé avec de bonnes prestations. Seul bémol, la WiFi pourrait être plus stable dans certaines chambres. Sinon, excellent séjour avec un personnel très accueillant.",
    date: "2024-01-10",
    helpful: 5,
    stayType: "Couple"
  },
  {
    id: "3",
    userName: "Sophie Bernard",
    rating: 5,
    title: "Paradis tropical",
    comment: "C'est exactement ce que je cherchais pour mes vacances ! Plage privée, spa relaxant, et des couchers de soleil à couper le souffle. L'hôtel respecte parfaitement l'environnement local.",
    date: "2024-01-05",
    helpful: 12,
    stayType: "Solo"
  }
];

interface ReviewSectionProps {
  hotelId: string;
  averageRating: number;
  totalReviews: number;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  hotelId,
  averageRating,
  totalReviews,
}) => {
  const { toast } = useToast();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmitReview = async (data: ReviewFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Avis publié !",
        description: "Merci pour votre avis. Il sera visible après validation.",
      });
      reset();
      setSelectedRating(0);
      setShowReviewForm(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la publication de l'avis.",
        variant: "destructive",
      });
    }
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setValue("rating", rating);
  };

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4 transition-colors",
          interactive && "cursor-pointer hover:text-secondary",
          i < (interactive ? (hoverRating || selectedRating) : rating)
            ? "fill-secondary text-secondary"
            : "text-muted-foreground"
        )}
        onClick={interactive ? () => handleRatingClick(i + 1) : undefined}
        onMouseEnter={interactive ? () => setHoverRating(i + 1) : undefined}
        onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Avis des clients</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(Math.round(averageRating))}
              </div>
              <span className="font-bold text-lg">{averageRating}</span>
              <span className="text-muted-foreground">({totalReviews} avis)</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-1 text-xs">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span>{stars}</span>
                    <Star className="h-3 w-3 fill-secondary text-secondary" />
                    <div className="flex-1 bg-muted h-2 rounded">
                      <div
                        className="bg-secondary h-full rounded"
                        style={{ width: `${(mockReviews.filter(r => r.rating === stars).length / mockReviews.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground">
                      {mockReviews.filter(r => r.rating === stars).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setShowReviewForm(true)}
              className="bg-gradient-ocean hover:shadow-glow transition-all"
            >
              Écrire un avis
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Laisser un avis</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4">
              <div className="space-y-2">
                <Label>Note générale *</Label>
                <div className="flex gap-1">
                  {renderStars(selectedRating, true)}
                </div>
                {errors.rating && (
                  <p className="text-xs text-destructive">{errors.rating.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-title">Titre de votre avis *</Label>
                <input
                  {...register("title")}
                  id="review-title"
                  placeholder="Résumez votre expérience en quelques mots"
                  className="w-full px-3 py-2 border border-border rounded-md"
                />
                {errors.title && (
                  <p className="text-xs text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-comment">Votre avis détaillé *</Label>
                <Textarea
                  {...register("comment")}
                  id="review-comment"
                  placeholder="Partagez votre expérience, ce qui vous a plu ou déplu..."
                  rows={4}
                />
                {errors.comment && (
                  <p className="text-xs text-destructive">{errors.comment.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-ocean hover:shadow-glow transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Publication..." : "Publier l'avis"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.userName}</span>
                      <Badge variant="outline" className="text-xs">
                        {review.stayType}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>

              <h4 className="font-semibold mb-2">{review.title}</h4>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {review.comment}
              </p>

              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Utile ({review.helpful})
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};