package ch.fhnw.webfr.flashcard.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="questionnaires")
public class Questionnaire {
    @Id //Mit dieser Annotation wird folgende Property als ID festgelegt
    private String id; //Die ID einer MongoDB ist immer vom Typ String
    private String title;
    private String description;

    public Questionnaire(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
