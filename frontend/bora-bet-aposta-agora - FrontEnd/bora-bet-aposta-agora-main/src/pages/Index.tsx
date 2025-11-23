import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Shield, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy className="h-16 w-16 text-primary animate-pulse" />
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              BoraBet
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            A melhor plataforma de apostas do Brasileirão Série A
          </p>
          
          <p className="text-lg text-foreground/80 mb-12">
            Aposte nos seus times favoritos com as melhores odds do mercado
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-gradient-primary hover:opacity-90 transition-smooth text-lg px-8 py-6 shadow-glow"
            >
              Começar Agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/auth")}
              className="border-border hover:bg-muted text-lg px-8 py-6"
            >
              Já tenho conta
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-lg bg-card border border-border shadow-card hover:shadow-glow transition-smooth">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Melhores Odds</h3>
            <p className="text-muted-foreground">
              As odds mais competitivas do mercado para você maximizar seus ganhos
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card border border-border shadow-card hover:shadow-glow transition-smooth">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">100% Seguro</h3>
            <p className="text-muted-foreground">
              Plataforma segura e confiável para suas apostas esportivas
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card border border-border shadow-card hover:shadow-glow transition-smooth">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Ao Vivo</h3>
            <p className="text-muted-foreground">
              Acompanhe e aposte em tempo real nos jogos do Brasileirão
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-primary rounded-2xl p-12 text-center max-w-3xl mx-auto shadow-glow">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Pronto para começar?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Cadastre-se agora e receba R$ 1.000 de bônus para suas primeiras apostas!
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-background text-foreground hover:bg-background/90 transition-smooth text-lg px-8 py-6"
          >
            Criar Minha Conta
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
