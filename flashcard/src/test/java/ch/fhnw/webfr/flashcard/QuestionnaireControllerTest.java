package ch.fhnw.webfr.flashcard;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;
import ch.fhnw.webfr.flashcard.web.QuestionnaireController;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(QuestionnaireController.class)
public class QuestionnaireControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private QuestionnaireRepository questionnaireRepositoryMock;

    @Before
    public void setUp() {
        Mockito.reset(questionnaireRepositoryMock);
    }

    @Test
    public void create_NewQuestionnaire_ShouldReturnOK() throws Exception {
        Questionnaire questionnaire = new TestUtil.QuestionnaireBuilder("1")
                .description("MyDescription")
                .title("MyTitle")
                .build();
        when(questionnaireRepositoryMock.save(questionnaire)).thenReturn(questionnaire);
        mockMvc.perform(post("/questionnaires")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestUtil.convertObjectToJsonBytes(questionnaire)))
                .andExpect(status().isCreated())
                .andExpect((ResultMatcher) jsonPath("$.id", is("1")))
                .andExpect((ResultMatcher) jsonPath("$.title",is("MyTitle")))
                .andExpect((ResultMatcher) jsonPath("$.description", is("MyDescription")));
        Mockito.verify(questionnaireRepositoryMock, times(1)).save(questionnaire);
    }
}
