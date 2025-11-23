import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Team {
  position: number;
  name: string;
  logo: string;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

const standings: Team[] = [
  { position: 1, name: "Botafogo", logo: "⚫⚪", points: 65, played: 30, wins: 20, draws: 5, losses: 5, goalsFor: 58, goalsAgainst: 28, goalDifference: 30 },
  { position: 2, name: "Palmeiras", logo: "🟢⚪", points: 63, played: 30, wins: 19, draws: 6, losses: 5, goalsFor: 55, goalsAgainst: 25, goalDifference: 30 },
  { position: 3, name: "Flamengo", logo: "🔴⚫", points: 61, played: 30, wins: 18, draws: 7, losses: 5, goalsFor: 60, goalsAgainst: 30, goalDifference: 30 },
  { position: 4, name: "Internacional", logo: "🔴⚪", points: 58, played: 30, wins: 17, draws: 7, losses: 6, goalsFor: 48, goalsAgainst: 28, goalDifference: 20 },
  { position: 5, name: "Fortaleza", logo: "🔴🔵", points: 55, played: 30, wins: 16, draws: 7, losses: 7, goalsFor: 45, goalsAgainst: 32, goalDifference: 13 },
  { position: 6, name: "São Paulo", logo: "🔴⚫", points: 53, played: 30, wins: 15, draws: 8, losses: 7, goalsFor: 46, goalsAgainst: 35, goalDifference: 11 },
  { position: 7, name: "Cruzeiro", logo: "🔵⚪", points: 50, played: 30, wins: 14, draws: 8, losses: 8, goalsFor: 42, goalsAgainst: 36, goalDifference: 6 },
  { position: 8, name: "Bahia", logo: "🔵🔴", points: 48, played: 30, wins: 14, draws: 6, losses: 10, goalsFor: 44, goalsAgainst: 38, goalDifference: 6 },
  { position: 9, name: "Grêmio", logo: "🔵⚫", points: 45, played: 30, wins: 13, draws: 6, losses: 11, goalsFor: 40, goalsAgainst: 38, goalDifference: 2 },
  { position: 10, name: "Atlético-MG", logo: "⚫⚪", points: 43, played: 30, wins: 12, draws: 7, losses: 11, goalsFor: 42, goalsAgainst: 42, goalDifference: 0 },
  { position: 11, name: "Vasco", logo: "⚫⚪", points: 42, played: 30, wins: 12, draws: 6, losses: 12, goalsFor: 38, goalsAgainst: 42, goalDifference: -4 },
  { position: 12, name: "Fluminense", logo: "🟢🔴", points: 40, played: 30, wins: 11, draws: 7, losses: 12, goalsFor: 36, goalsAgainst: 40, goalDifference: -4 },
  { position: 13, name: "Corinthians", logo: "⚫⚪", points: 38, played: 30, wins: 10, draws: 8, losses: 12, goalsFor: 35, goalsAgainst: 42, goalDifference: -7 },
  { position: 14, name: "RB Bragantino", logo: "⚪🔴", points: 35, played: 30, wins: 10, draws: 5, losses: 15, goalsFor: 38, goalsAgainst: 48, goalDifference: -10 },
  { position: 15, name: "Juventude", logo: "🟢⚪", points: 32, played: 30, wins: 8, draws: 8, losses: 14, goalsFor: 32, goalsAgainst: 46, goalDifference: -14 },
  { position: 16, name: "Vitória", logo: "🔴⚫", points: 28, played: 30, wins: 7, draws: 7, losses: 16, goalsFor: 30, goalsAgainst: 50, goalDifference: -20 },
];

const Standings = () => {
  const getPositionIcon = (position: number) => {
    if (position <= 4) {
      return <TrendingUp className="h-4 w-4 text-primary" />;
    } else if (position >= 13) {
      return <TrendingDown className="h-4 w-4 text-destructive" />;
    }
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getPositionColor = (position: number) => {
    if (position <= 4) return "border-l-4 border-l-primary";
    if (position >= 5 && position <= 6) return "border-l-4 border-l-accent";
    if (position >= 13) return "border-l-4 border-l-destructive";
    return "border-l-4 border-l-muted";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8 text-primary" />
          <div>
            <h3 className="text-2xl font-bold">Classificação</h3>
            <p className="text-sm text-muted-foreground">Brasileirão Série A 2025</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
            <span className="text-muted-foreground">Libertadores</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-sm"></div>
            <span className="text-muted-foreground">Pré-Libertadores</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive rounded-sm"></div>
            <span className="text-muted-foreground">Rebaixamento</span>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden bg-card border-border shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="text-left text-sm">
                <th className="p-3 font-semibold">#</th>
                <th className="p-3 font-semibold">Time</th>
                <th className="p-3 font-semibold text-center hidden md:table-cell">P</th>
                <th className="p-3 font-semibold text-center">J</th>
                <th className="p-3 font-semibold text-center hidden sm:table-cell">V</th>
                <th className="p-3 font-semibold text-center hidden sm:table-cell">E</th>
                <th className="p-3 font-semibold text-center hidden sm:table-cell">D</th>
                <th className="p-3 font-semibold text-center hidden md:table-cell">SG</th>
                <th className="p-3 font-semibold text-center">PTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr
                  key={team.position}
                  className={`border-t border-border hover:bg-muted/30 transition-smooth ${getPositionColor(
                    team.position
                  )}`}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {getPositionIcon(team.position)}
                      <span className="font-semibold">{team.position}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{team.logo}</span>
                      <span className="font-medium">{team.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-center hidden md:table-cell text-muted-foreground">
                    {team.points}
                  </td>
                  <td className="p-3 text-center text-muted-foreground">{team.played}</td>
                  <td className="p-3 text-center hidden sm:table-cell text-muted-foreground">
                    {team.wins}
                  </td>
                  <td className="p-3 text-center hidden sm:table-cell text-muted-foreground">
                    {team.draws}
                  </td>
                  <td className="p-3 text-center hidden sm:table-cell text-muted-foreground">
                    {team.losses}
                  </td>
                  <td className="p-3 text-center hidden md:table-cell text-muted-foreground">
                    {team.goalDifference > 0 ? "+" : ""}
                    {team.goalDifference}
                  </td>
                  <td className="p-3 text-center">
                    <span className="font-bold text-primary text-lg">{team.points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Standings;
