import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dataFake } from '../../data/dataFake';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  photoCover: string = "";
  contentTitle: string = "";
  contentDescription: string = "";
  content: string = "";
  postUrl: string = "";
  private id: string | null = "0";

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.id = value.get("id");
      this.setValuesToComponent(this.id);
      this.postUrl = `https://meublog.com/content/${this.id}`;
    });

    // Adiciona o evento de scroll para mostrar/ocultar o botão
    window.addEventListener('scroll', () => this.toggleBackToTopButton());
  }

  setValuesToComponent(id: string | null) {
    const result = dataFake.filter(article => article.id == id)[0];
    this.contentTitle = result.title;
    this.contentDescription = result.description;
    this.photoCover = result.photoCover;
    this.content = result.content;
  }

  // Função para voltar ao topo
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Função para mostrar/ocultar o botão com base no scroll
  toggleBackToTopButton() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
      backToTopButton?.classList.add('visible');
    } else {
      backToTopButton?.classList.remove('visible');
    }
  }

  // Função para calcular o tempo de leitura
  calculateReadingTime(content: string): number {
    const wordsPerMinute = 200; // Média de palavras por minuto
    const wordCount = content.split(/\s+/).length; // Conta o número de palavras
    return Math.ceil(wordCount / wordsPerMinute); // Arredonda para cima
  }
}
