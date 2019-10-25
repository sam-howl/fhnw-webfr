package ch.fhnw.webfr.flashcard.web;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/questionnaires")
public class QuestionnaireController {
    @Autowired
    private QuestionnaireRepository questionnaireRepository;

    @RequestMapping(method = RequestMethod.GET)
    public void findAll(HttpServletResponse response, HttpServletRequest request)
            throws IOException {
        List<Questionnaire> questionnaires = questionnaireRepository.findAll();
        PrintWriter writer = response.getWriter();
        writer.append("<html><head><title>Example</title></head><body>");
        writer.append("<h3>Frageboegen</h3>");
        for (Questionnaire questionnaire : questionnaires) {
            String url = request.getContextPath() + request.getServletPath();
            url = url + "/" + questionnaire.getId().toString();
            writer.append("<p><a href='" + response.encodeURL(url) + "'>" + questionnaire.getTitle() + "</a></p>");
        }
        writer.append("</body></html>");
    }

    @RequestMapping(value="/{id}")
    public void findById(@PathVariable String id, HttpServletResponse response,
                         HttpServletRequest request) throws IOException {
        Questionnaire q = questionnaireRepository.findById(id).get();
        PrintWriter writer = response.getWriter();
        writer.append("<html><head><title>" + q.getTitle() + "</title></head><body>");
        writer.append("<h3>Questionnaires</h3>");
        writer.append("<p><b>" + q.getTitle() +"</b></p>");
        writer.append("<p>"+ q.getDescription() + "</p>");
        writer.append("</body></html>");
    }
}
