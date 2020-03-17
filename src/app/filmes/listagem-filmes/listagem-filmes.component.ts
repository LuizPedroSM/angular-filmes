import { Component, OnInit } from "@angular/core";
import { FilmesService } from "src/app/core/filmes.service";
import { Filme } from "src/app/shared/models/filme";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "dio-listagem-filmes",
  templateUrl: "./listagem-filmes.component.html",
  styleUrls: ["./listagem-filmes.component.scss"]
})
export class ListagemFilmesComponent implements OnInit {
  readonly qtdPagina = 4;
  filmes: Filme[] = [];
  pagina = 0;
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(private filmesService: FilmesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [""],
      genero: [""]
    });
    this.generos = [
      "Ação",
      "Aventura",
      "Comédia",
      "Drama",
      "Ficção cientifica",
      "Romance",
      "Terror"
    ];
    this.listarFilmes();
  }

  onScroll(): void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.pagina++;
    this.filmesService
      .listar(this.pagina, this.qtdPagina)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes));
  }
}
