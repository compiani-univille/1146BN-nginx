package com.example.tournaments_service.repo;

import com.example.tournaments_service.model.Entities.Tournament;
import com.example.tournaments_service.model.Entities.TournamentMatch;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class InMemoryStore {

    public final Map<Long, Tournament> tournaments = new ConcurrentHashMap<>();
    public final Map<Long, TournamentMatch> matches = new ConcurrentHashMap<>();

    private static final InMemoryStore INSTANCE = new InMemoryStore();
    public static InMemoryStore get() { return INSTANCE; }

    private InMemoryStore() {}
}
