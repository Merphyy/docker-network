package sawebapp.demo;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import sawebapp.demo.dto.SentenceDto;
import sawebapp.demo.dto.SentimentDto;

@CrossOrigin(origins = "*")
@RestController
public class SentimentController {
    //@Value("${sa.logic.api.url}")
     private String saLogicApiUrl = "http://python:5000";
    //private String saLogicApiUrl = "http://sa-logic-lb";

    @PostMapping("/sentiment")
    public SentimentDto sentimentAnalysis(@RequestBody SentenceDto sentenceDto) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(saLogicApiUrl + "/analyse/sentiment",
                sentenceDto, SentimentDto.class)
                .getBody();
    }

    @GetMapping("/testComms") 
    public String testComms() { 
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> result = restTemplate.getForEntity(saLogicApiUrl + "/testHealth", String.class); 
        //assertEquals(HttpStatus.OK, result.getStatusCode());
        return result.getBody();
    }

    @GetMapping("/testHealth")
    public String testHealth() {
        return  "hello from springboot webapp!";
    }
}
