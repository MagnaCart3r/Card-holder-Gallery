import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CreditCard, Info } from 'lucide-react';
import { Button } from './button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { cn } from '@/lib/utils';

interface CardCarouselProps {
  cards: Array<{
    id: number;
    type: string;
    cardNumber: string;
    holderName: string;
    expiryDate: string;
    bankName: string;
    cardImage: string;
    theme: string;
  }>;
}

export function CardCarousel({ cards }: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      if (!flipped) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 10000);
      }
    }, 15000);

    return () => clearInterval(animationInterval);
  }, [flipped]);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setFlipped(false);
    setIsAnimating(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setFlipped(false);
    setIsAnimating(false);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4">
      <div className="flex items-center justify-center min-h-[400px]">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 z-10 text-purple-200 hover:text-white hover:bg-purple-800/50"
          onClick={prevCard}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <div
          className={cn(
            "relative w-96 h-56 rounded-xl transition-all duration-500 transform-gpu cursor-pointer shadow-xl",
            flipped ? "[transform:rotateY(180deg)]" : "",
            isAnimating && !flipped ? "animate-[floatAnimation_10s_ease-in-out]" : ""
          )}
          onClick={() => {
            if (!isAnimating) {
              setFlipped(!flipped);
            }
          }}
          style={{ perspective: "1000px" }}
        >
          {/* Front of card */}
          <div
            className={cn(
              "absolute w-full h-full rounded-xl p-6 backface-hidden shadow-2xl",
              currentCard.theme === 'purple' ? 'bg-gradient-to-br from-purple-600 to-purple-900' :
              currentCard.theme === 'brown' ? 'bg-gradient-to-br from-amber-700 to-amber-900' :
              'bg-gradient-to-br from-gray-800 to-gray-900'
            )}
            style={{ 
              backgroundImage: `url(${currentCard.cardImage})`,
              backgroundSize: 'cover',
              backgroundBlend: 'overlay',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="flex flex-col justify-between h-full text-white">
              <div className="flex justify-between items-start">
                <CreditCard className="h-10 w-10" />
                <span className="text-lg font-semibold">{currentCard.bankName}</span>
              </div>
              <div className="space-y-6">
                <div className="text-xl font-mono tracking-wider">{currentCard.cardNumber}</div>
                <div className="flex justify-between items-end">
                  <div className="flex-1">
                    <div className="text-sm opacity-80 mb-1">CARD HOLDER</div>
                    <div className="text-2xl font-semibold tracking-wide">{currentCard.holderName}</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-80">EXPIRES</div>
                    <div className="text-lg">{currentCard.expiryDate}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div
            className={cn(
              "absolute w-full h-full rounded-xl p-0 [transform:rotateY(180deg)] backface-hidden overflow-hidden shadow-2xl",
              currentCard.theme === 'purple' ? 'bg-gradient-to-br from-purple-600 to-purple-900' :
              currentCard.theme === 'brown' ? 'bg-gradient-to-br from-amber-700 to-amber-900' :
              'bg-gradient-to-br from-gray-800 to-gray-900'
            )}
          >
            {/* Magnetic Stripe */}
            <div className="w-full h-12 bg-black/90 mt-6"></div>
            
            {/* Signature Strip */}
            <div className="mt-8 px-4">
              <div className="bg-white h-12 w-full flex items-center justify-between px-4">
                <div className="font-mono text-sm text-black/70">Authorized Signature</div>
                <div className="font-mono text-lg bg-white px-3 py-1">{currentCard.holderName}</div>
              </div>
            </div>

            {/* CVV Section */}
            <div className="mt-6 px-4">
              <div className="flex justify-end items-center space-x-2">
                <div className="text-xs text-white/90">CVV</div>
                <div className="bg-white/90 h-6 w-12 flex items-center justify-center">
                  <div className="text-black font-mono">***</div>
                </div>
              </div>
            </div>

            {/* Card Information */}
            <div className="absolute bottom-4 px-4 w-full">
              <div className="text-white/80 text-xs space-y-1">
                <p>This card is property of {currentCard.bankName}</p>
                <p>If found, please return to any {currentCard.bankName} branch</p>
                <p>24/7 Support: 1-800-BANK-NOW</p>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 z-10 text-purple-200 hover:text-white hover:bg-purple-800/50"
          onClick={nextCard}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="mt-4 bg-purple-800/50 text-purple-100 hover:bg-purple-700/50 border-purple-600"
          >
            <Info className="mr-2 h-4 w-4" />
            View Card Details
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-purple-950 border-purple-800">
          <DialogHeader>
            <DialogTitle className="text-purple-100">{currentCard.type} Card Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-purple-200">Card Holder</h4>
              <p className="text-sm text-purple-300/80">{currentCard.holderName}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-purple-200">Bank</h4>
              <p className="text-sm text-purple-300/80">{currentCard.bankName}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-purple-200">Card Number</h4>
              <p className="text-sm text-purple-300/80">{currentCard.cardNumber}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-purple-200">Expiry Date</h4>
              <p className="text-sm text-purple-300/80">{currentCard.expiryDate}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}