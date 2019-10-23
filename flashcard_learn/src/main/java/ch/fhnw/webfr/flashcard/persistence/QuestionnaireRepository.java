package ch.fhnw.webfr.flashcard.persistence;

import java.util.ArrayList;
import java.util.List;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component //Mit dieser Annotation wird die Klasse vom Spring Container als Spring Bean erkannt. Wichtig!
public class QuestionnaireRepository {
    //	private static QuestionnaireRepository instance;
    private List<Questionnaire> questionnaires = new ArrayList<Questionnaire>();
    private static final Log logger = LogFactory.getLog(QuestionnaireRepository.class);

//	private QuestionnaireRepository() {}
//
//	public static QuestionnaireRepository getInstance() {
//		if (instance == null) {
//			instance = new QuestionnaireRepository();
//		}
//		return instance;
//	}

    public Long save(Questionnaire q) {
        Long id = new Long(questionnaires.size());
        q.setId(id);
        questionnaires.add(q);
        return id;
    }

    public List<Questionnaire> findAll() {
        return questionnaires;
    }

    public Questionnaire findById(Long id) {
        return questionnaires.get(id.intValue());
    }

    public void clear() {
        questionnaires = new ArrayList<Questionnaire>();
    }

    @PostConstruct
    /* Die Methode bei dieser Annotation wird der Spring Container nach
    der Initialisierung des Spring Bean ausführen. In diesem Falle werden
    ein paar Questionnaire-Entitäten angelegt */
    public void initRepoWithTestData() {
        save(new Questionnaire("Test Questionnaire 1",
                "Lorem ipsum dolor sit amet..."));
        save(new Questionnaire("Test Questionnaire 2",
                "Lorem ipsum dolor sit amet..."));
        save(new Questionnaire("i18n Test fünf",
                "Lorem ipsum dolor sit amet..."));
        logger.debug("Questionnaires initialized successfully");
        /* Diesen Log-Output sollten sie beim Hochfahren der Applikation
        in der Console sehen. Verwendet wird "Apache Commons Logging" */
    }
}