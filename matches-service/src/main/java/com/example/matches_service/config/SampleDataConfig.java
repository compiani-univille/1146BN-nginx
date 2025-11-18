package com.example.matches_service.config;

import com.example.matches_service.model.Entities.Match;
import com.example.matches_service.repo.InMemoryStore;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Configuration
public class SampleDataConfig {

    @PostConstruct
    public void init() {
        var store = InMemoryStore.get();

        // Jogo futuro
        var m1 = new Match();
        m1.id = 101L;
        m1.homeTeam = "Corinthians";
        m1.awayTeam = "Palmeiras";
        m1.startsAt = Instant.now().plus(2, ChronoUnit.DAYS).truncatedTo(ChronoUnit.SECONDS);
        m1.status = "SCHEDULED";
        store.matches.put(m1.id, m1);

        // Jogo ao vivo (exemplo)
        var m2 = new Match();
        m2.id = 102L;
        m2.homeTeam = "Flamengo";
        m2.awayTeam = "Vasco";
        m2.startsAt = Instant.now().minus(10, ChronoUnit.MINUTES);
        m2.status = "LIVE";
        store.matches.put(m2.id, m2);

        // Jogo encerrado (exemplo)
        var m3 = new Match();
        m3.id = 103L;
        m3.homeTeam = "São Paulo";
        m3.awayTeam = "Santos";
        m3.startsAt = Instant.now().minus(2, ChronoUnit.DAYS);
        m3.status = "FINISHED";
        store.matches.put(m3.id, m3);
    }
}
