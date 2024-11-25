import { ATM_CARDS } from './lib/constants';
import { CardCarousel } from './components/ui/card-carousel';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white/90">
            Carter ATM Card Gallery
          </h1>
          <p className="mt-4 text-purple-200/80">
            Explore your premium card collection with interactive views
          </p>
        </div>
        
        <CardCarousel cards={ATM_CARDS} />
        
        <div className="mt-12 text-center text-sm text-purple-200/60">
          Click on a card to view its reverse side
        </div>
      </div>
    </div>
  );
}

export default App;