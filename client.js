import java.util.HashMap;
import java.util.Map;

public class CustomGameMode {
    
    private int matchTimeInSeconds = 300; // 5 минут на раунд
    private Map<String, Integer> teamScores;
    private boolean isGameActive = false;

    public void startMode() {
        teamScores = new HashMap<>();
        teamScores.put("Red", 0);
        teamScores.put("Blue", 0);
        
        isGameActive = true;
        System.out.println("Режим игры запущен! Время раунда: " + matchTimeInSeconds + " сек.");
        
        startTimer();
    }

    public void onPlayerSpawn(String player, String team) {
        if (!isGameActive) return;

        // Логика телепортации на базу в зависимости от команды
        if (team.equals("Red")) {
            // teleportPlayer(player, spawnPointRedX, spawnPointRedY, spawnPointRedZ);
        } else if (team.equals("Blue")) {
            // teleportPlayer(player, spawnPointBlueX, spawnPointBlueY, spawnPointBlueZ);
        }
    }

    public void onPlayerKilled(String killer, String victim, String killerTeam) {
        if (!isGameActive) return;

        // Начисление очков
        int currentScore = teamScores.getOrDefault(killerTeam, 0);
        teamScores.put(killerTeam, currentScore + 1);
        
        System.out.println("Игрок " + killer + " убил " + victim + "! Счет команды " + killerTeam + ": " + teamScores.get(killerTeam));

        checkWinCondition();
    }

    private void startTimer() {
        // Упрощенная логика тиков
        new Thread(() -> {
            while (matchTimeInSeconds > 0 && isGameActive) {
                try {
                    Thread.sleep(1000); // Пауза 1 секунда
                    matchTimeInSeconds--;
                    // updateUI("Осталось времени: " + matchTimeInSeconds);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            endGame("Время вышло!");
        }).start();
    }

    private void checkWinCondition() {
        // Условие победы, например, 50 очков
        for (Map.Entry<String, Integer> entry : teamScores.entrySet()) {
            if (entry.getValue() >= 50) {
                endGame("Победа команды " + entry.getKey());
            }
        }
    }

    private void endGame(String reason) {
        isGameActive = false;
        System.out.println("Игра окончена. Причина: " + reason);
        // showWinnerScreen(teamScores);
    }
  }
      
