package com.example.matches_service.model;

import java.time.Instant;

public class Entities {

    public static class Match {
        public Long id;
        public String homeTeam;
        public String awayTeam;
        public Instant startsAt;
        public String status; // SCHEDULED | LIVE | FINISHED
    }
}
