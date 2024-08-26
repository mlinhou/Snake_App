package com.snake.snakeBackend;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Players")
public class User {
    @Id
    private String id;
    private String name;
    private int score;
    @Getter
    @Setter
    private String username;
    private String password;
    private String email;
    private String role;

}
