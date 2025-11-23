import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { betsService, Match, Market } from "@/lib/api";
import { toast } from "sonner";

interface MatchCardProps {
  match: Match;
  onBet: (matchId: number, marketId: number, selectionCode: string, odds: number, stake: number) => void;
  userBalance: number;
}

const MatchCard = ({ match, onBet, userBalance }: MatchCardProps) => {
  const [selectedBet, setSelectedBet] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState("");
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarkets = async () => {
      try {
        const marketsData = await betsService.listMarkets(match.id);
        setMarkets(marketsData);
      } catch (error) {
        toast.error("Erro ao carregar odds");
      } finally {
        setLoading(false);
      }
    };

    loadMarkets();
  }, [match.id]);

  const handleBetClick = (betType: string) => {
    setSelectedBet(betType);
    setBetAmount("");
  };

  const handleConfirmBet = () => {
    const amount = parseFloat(betAmount);
    if (!amount || amount <= 0) {
      return;
    }

    // Encontrar o market correto (assumindo que o primeiro market é o principal)
    const market = markets[0];
    if (!market) return;

    // Encontrar a seleção correspondente
    const selection = market.selections.find(s => s.code === selectedBet);
    if (!selection) return;

    onBet(match.id, market.id, selectedBet!, selection.odds, amount);
    setSelectedBet(null);
    setBetAmount("");
  };

  const getOddsForBet = () => {
    const market = markets[0];
    if (!market) return 0;

    const selection = market.selections.find(s => s.code === selectedBet);
    return selection?.odds || 0;
  };

  const getBetLabel = () => {
    if (selectedBet === "HOME") return match.homeTeam;
    if (selectedBet === "DRAW") return "Empate";
    if (selectedBet === "AWAY") return match.awayTeam;
    return "";
  };

  const getOdds = (code: string) => {
    const market = markets[0];
    if (!market) return "-.--";
    
    const selection = market.selections.find(s => s.code === code);
    return selection?.odds.toFixed(2) || "-.--";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Card className="p-6 bg-card border-border shadow-card animate-pulse">
        <div className="h-40 bg-muted rounded"></div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card border-border shadow-card hover:shadow-glow transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(match.startsAt)}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${
          match.status === 'SCHEDULED' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
        }`}>
          {match.status}
        </span>
      </div>

      {/* Teams */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-4xl mb-2">⚽</div>
          <div className="font-semibold text-sm">{match.homeTeam}</div>
        </div>
        
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold text-muted-foreground">VS</span>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-2">⚽</div>
          <div className="font-semibold text-sm">{match.awayTeam}</div>
        </div>
      </div>

      {/* Odds Buttons */}
      {!selectedBet && markets.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => handleBetClick("HOME")}
            className="flex flex-col py-6 bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
            variant="outline"
          >
            <span className="text-xs mb-1">Casa</span>
            <span className="text-lg font-bold">{getOdds("HOME")}</span>
          </Button>
          
          <Button
            onClick={() => handleBetClick("DRAW")}
            className="flex flex-col py-6 bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
            variant="outline"
          >
            <span className="text-xs mb-1">Empate</span>
            <span className="text-lg font-bold">{getOdds("DRAW")}</span>
          </Button>
          
          <Button
            onClick={() => handleBetClick("AWAY")}
            className="flex flex-col py-6 bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
            variant="outline"
          >
            <span className="text-xs mb-1">Fora</span>
            <span className="text-lg font-bold">{getOdds("AWAY")}</span>
          </Button>
        </div>
      )}

      {/* Bet Input */}
      {selectedBet && (
        <div className="space-y-3 animate-in fade-in-50">
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Aposta:</span>
              <span className="font-semibold">{getBetLabel()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Odd:</span>
              <span className="font-bold text-primary">{getOddsForBet()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Valor da aposta"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              max={userBalance}
              className="bg-background border-border"
            />
            
            {betAmount && (
              <div className="text-sm text-center p-2 bg-primary/10 rounded">
                <span className="text-muted-foreground">Retorno potencial: </span>
                <span className="font-bold text-primary">
                  R$ {(parseFloat(betAmount) * getOddsForBet()).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedBet(null)}
              className="border-border hover:bg-muted"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmBet}
              disabled={!betAmount || parseFloat(betAmount) <= 0}
              className="bg-gradient-primary hover:opacity-90 transition-smooth"
            >
              Confirmar
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default MatchCard;
