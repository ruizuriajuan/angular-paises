import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject,  debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  
  private writeUser = new Subject<string>(); 

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public pepito = new EventEmitter<string>();

  ngOnInit(): void {
    this.writeUser
    .pipe(
      debounceTime(1000)
    )
    .subscribe( valor =>{
      this.pepito.emit(valor)
    })
  }

  ngOnDestroy(): void {
    this.writeUser.unsubscribe;
  }

  enviarValor(buscar: string) {
    this.pepito.emit(buscar);
  }
  
  onKeyPress(searchTerm: string) {
    this.writeUser.next(searchTerm);    
  }


}
