import { NgModule } from '@angular/core';
import { FilterPipe} from './filter.pipe';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    FilterPipe
  ],
  exports: [
    FilterPipe
  ]
})
export class PipesModule {}