package ch.fhnw.webfr.flashcard.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Size;

@Document(collection="questionnaires")
public class Questionnaire {
    @Id //Mit dieser Annotation wird folgende Property als ID festgelegt
    private String id; //Die ID einer MongoDB ist immer vom Typ String
    @Size(min = 2, max = 30)
    private String title;
    @Size(min = 10, max = 50)
    private String description;

    public Questionnaire(){

    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

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
