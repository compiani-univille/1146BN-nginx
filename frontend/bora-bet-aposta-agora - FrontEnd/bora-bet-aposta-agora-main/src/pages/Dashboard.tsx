import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, LogOut, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import MatchCard from "@/components/MatchCard";
import MyBets from "@/components/MyBets";
import Standings from "@/components/Standings";
import { betsService, Match } from "@/lib/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [balance, setBalance] = useState(1000);
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDashboard = async () => {
      // Verificar se usuário está logado
      const userData = localStorage.getItem("borabet_user");
      if (!userData) {
        navigate("/auth");
        return;
      }
      setUser(JSON.parse(userData));

      try {
        // Buscar partidas do backend
        const matchesData = await betsService.listMatches();
        setMatches(matchesData);

        // Buscar apostas do usuário
        const betsData = await betsService.listBets();
        setBets(betsData);
      } catch (error) {
        toast.error("Erro ao carregar dados");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("borabet_user");
    localStorage.removeItem("borabet_token");
    toast.success("Logout realizado com sucesso!");
    navigate("/auth");
  };

  // 🔥 MÉTODO CORRIGIDO
  const handleBet = async (
    matchId: number,
    marketId: number,
    selectionCode: string,
    odds: number,
    stake: number
  ) => {
    if (stake > balance) {
      toast.error("Saldo insuficiente!");
      return;
    }

    try {
      const betResponse = await betsService.createBet({
        matchId,
        marketId,
        selectionCode,
        expectedOdds: odds,        // 🔥 nome correto
        stake: Number(stake),      // 🔥 garantir número
        idempotencyKey: crypto.randomUUID(), // 🔥 obrigatório
      });

      // Atualizar lista de apostas
      const updatedBets = await betsService.listBets();
      setBets(updatedBets);

      // Atualizar saldo
      setBalance(balance - stake);

      toast.success(
        `Aposta realizada! Retorno potencial: R$ ${betResponse.potentialReturn.toFixed(2)}`
      );
    } catch (error) {
      toast.error("Erro ao criar aposta");
      console.error(error);
    }
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <Trophy className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                BoraBet
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Card className="px-4 py-2 bg-background border-border">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Saldo:</span>
                  <span className="font-bold text-primary">R$ {balance.toFixed(2)}</span>
                </div>
              </Card>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-border hover:bg-muted"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mb-8">
            <TabsTrigger value="matches">Partidas</TabsTrigger>
            <TabsTrigger value="bets">Minhas Apostas</TabsTrigger>
            <TabsTrigger value="standings">Classificação</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Brasileirão Série A 2025</h2>
              <p className="text-muted-foreground">
                Aposte nos melhores jogos do campeonato brasileiro
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {matches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onBet={handleBet}
                  userBalance={balance}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bets">
            <MyBets bets={bets} />
          </TabsContent>

          <TabsContent value="standings">
            <Standings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
