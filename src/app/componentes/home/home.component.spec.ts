import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { TaskService } from '../../service/task/task.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let taskService: TaskService;

  beforeEach(() => {
    const taskServiceStub = {
      obtenerTareas: jasmine.createSpy('obtenerTareas').and.returnValue(of([])),
      adicionarTarea: jasmine.createSpy('adicionarTarea').and.returnValue(of({})),
      editarTarea: jasmine.createSpy('editarTarea').and.returnValue(of({})),
      eliminarTarea: jasmine.createSpy('eliminarTarea').and.returnValue(of({})),
      completarTarea: jasmine.createSpy('completarTarea').and.returnValue(of({}))
    };

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [{ provide: TaskService, useValue: taskServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar las tareas en el init', () => {
    expect(taskService.obtenerTareas).toHaveBeenCalled();
  });

  it('debe agregar una tarea', () => {
    const taskForm = { valid: true, resetForm: jasmine.createSpy('resetForm') };
    component.newTask = { title: 'Test Task', description: 'Test Description' };
    component.agregarTarea(taskForm);
    expect(taskService.adicionarTarea).toHaveBeenCalledWith({ title: 'Test Task', description: 'Test Description' });
    expect(taskForm.resetForm).toHaveBeenCalled();
  });

  it('debe iniciar la edición de una tarea', () => {
    const task = { id: '1', title: 'Test Task', description: 'Test Description' };
    component.EditarTarea(task);
    expect(component.editingTaskId).toBe(task.id);
    expect(component.editingTask).toEqual(task);
  });

  it('debe guardar una tarea', () => {
    const editForm = { valid: true, resetForm: jasmine.createSpy('resetForm') };
    component.editingTaskId = '1';
    component.editingTask = { title: 'Updated Task', description: 'Updated Description' };
    component.guardarTarea(editForm);
    expect(taskService.editarTarea).toHaveBeenCalledWith('1', { title: 'Updated Task', description: 'Updated Description' });
    expect(editForm.resetForm).toHaveBeenCalled();
  });

  it('debe cancelar la edición', () => {
    component.editingTaskId = '1';
    component.editingTask = { title: 'Test Task', description: 'Test Description' };
    component.cancelarEdicion();
    expect(component.editingTaskId).toBeNull();
    expect(component.editingTask).toEqual({});
  });

  it('debe eliminar una tarea', () => {
    component.eliminarTarea('1');
    expect(taskService.eliminarTarea).toHaveBeenCalledWith('1');
  });


});