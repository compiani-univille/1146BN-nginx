package com.example.tournaments_service.config;

import com.example.tournaments_service.model.Entities.Tournament;
import com.example.tournaments_service.model.Entities.TournamentMatch;
import com.example.tournaments_service.repo.InMemoryStore;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Configuration
public class SampleDataConfig {

    @PostConstruct
    public void init() {
        var store = InMemoryStore.get();

        // Torneio 1 - Brasileirão
        var t1 = new Tournament();
        t1.id = 1L;
        t1.name = "Brasileirão Série A";
        t1.country = "Brasil";
        t1.season = "2025";
        t1.type = "LEAGUE";
        store.tournaments.put(t1.id, t1);

        // Torneio 2 - Libertadores
        var t2 = new Tournament();
        t2.id = 2L;
        t2.name = "Copa Libertadores";
        t2.country = "América do Sul";
        t2.season = "2025";
        t2.type = "CUP";
        store.tournaments.put(t2.id, t2);

        // Torneio 3 - Champions
        var t3 = new Tournament();
        t3.id = 3L;
        t3.name = "UEFA Champions League";
        t3.country = "Europa";
        t3.season = "2025/26";
        t3.type = "CUP";
        store.tournaments.put(t3.id, t3);

        // Jogos ligados ao torneio 1 (reaproveitando ids 101,102,103 dos matches)
        var m1 = new TournamentMatch();
        m1.id = 50001L;
        m1.tournamentId = t1.id;
        m1.matchId = 101L;
        m1.round = "Rodada 1";
        m1.homeTeam = "Corinthians";
        m1.awayTeam = "Palmeiras";
        m1.startsAt = Instant.now().plus(2, ChronoUnit.DAYS).truncatedTo(ChronoUnit.SECONDS);
        m1.status = "SCHEDULED";
        store.matches.put(m1.id, m1);

        var m2 = new TournamentMatch();
        m2.id = 50002L;
        m2.tournamentId = t1.id;
        m2.matchId = 102L;
        m2.round = "Rodada 1";
        m2.homeTeam = "Flamengo";
        m2.awayTeam = "Vasco";
        m2.startsAt = Instant.now().minus(10, ChronoUnit.MINUTES);
        m2.status = "LIVE";
        store.matches.put(m2.id, m2);

        var m3 = new TournamentMatch();
        m3.id = 50003L;
        m3.tournamentId = t1.id;
        m3.matchId = 103L;
        m3.round = "Rodada 2";
        m3.homeTeam = "São Paulo";
        m3.awayTeam = "Santos";
        m3.startsAt = Instant.now().minus(2, ChronoUnit.DAYS);
        m3.status = "FINISHED";
        store.matches.put(m3.id, m3);
    }
}
