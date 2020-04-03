import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UsuarioModel } from '../../models/usuario.model';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import {SelectionModel} from '@angular/cdk/collections';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'procesado','select'];

  usuarioModel: UsuarioModel = new UsuarioModel();

  constructor( private router: Router, private usuarioService: UsuarioService ) { this.getAllClient();
  }


  consultaSol: UsuarioModel[] = new Array<UsuarioModel>();
  dataSource = new MatTableDataSource<UsuarioModel>();
  selection = new SelectionModel<UsuarioModel>(true, []);


  ngOnInit() {

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => {
          console.log(row);
          this.selection.select(row)
        });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UsuarioModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  public getAllClient() {

      this.usuarioService.get('/usuario/consultar').subscribe((respuesta: any) => {

        this.consultaSol = respuesta;
        this.dataSource = new MatTableDataSource<UsuarioModel>(this.consultaSol);

      });

  }


  public saveUsuario() {

    console.log(this.usuarioModel.nombre);
    console.log(this.usuarioModel.apellido);
    console.log(this.usuarioModel.procesado);

    const object = {
        nombre: this.usuarioModel.nombre,
        apellido: this.usuarioModel.apellido,
        procesado: false,
    };

    if((this.usuarioModel.nombre !== "" && this.usuarioModel.apellido !== "") 
    && (this.usuarioModel.nombre !== undefined && this.usuarioModel.apellido !== undefined)){
      console.log(JSON.stringify(object));
      this.usuarioService.post('/usuario/guardar', object).subscribe(
        (respuesta: any) => {
            console.log(JSON.stringify(respuesta));
            this.getAllClient();
            this.usuarioModel.nombre = "";
            this.usuarioModel.apellido = "";
        }
      );
    }
  }



  public cambiarEstado() {

    this.selection.selected.forEach((value, item) => {
       this.selection.selected[item].procesado = true;
    });

    console.log(JSON.stringify(this.selection.selected));

    this.usuarioService.post('/usuario/guardar/usuarios', this.selection.selected).subscribe(
      (respuesta: any) => {
          console.log(JSON.stringify(respuesta));
          this.getAllClient();
      }
    );

  }



}
