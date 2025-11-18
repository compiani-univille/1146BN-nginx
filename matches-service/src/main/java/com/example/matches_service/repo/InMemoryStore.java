package com.example.matches_service.repo;

import com.example.matches_service.model.Entities.Match;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class InMemoryStore {
    public final Map<Long, Match> matches = new ConcurrentHashMap<>();

    private static final InMemoryStore INSTANCE = new InMemoryStore();
    public static InMemoryStore get() { return INSTANCE; }

    private InMemoryStore() {}
}
