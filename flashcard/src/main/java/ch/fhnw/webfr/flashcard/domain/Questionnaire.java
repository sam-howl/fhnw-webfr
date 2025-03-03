package ch.fhnw.webfr.flashcard.domain;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection="questionnaires")
public class Questionnaire {
    @Id
    private String id;
	
	@NotNull
    @Size(min=2, max=30)
    private String  title;
	
	@NotNull
    @Size(min=10, max=50)
    private String description;

    public void setId(String id) {
    }

    public void setDescription(String description) {
    }

    public void setTitle(String title) {
    }
}
