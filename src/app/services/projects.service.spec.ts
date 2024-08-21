import { TestBed } from '@angular/core/testing';

import { ProjectService1 } from './projects.service1';

describe('ProjectsService', () => {
  let service: ProjectService1 ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectService1 );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
