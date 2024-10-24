import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasks: any[] = [];
  newTask: any = {};
  editingTaskId: string | null = null;
  editingTask: any = {};

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.taskService.obtenerTareas().subscribe(data => {
      this.tasks = data;
    });
  }

  agregarTarea(taskForm: any): void {
    if (taskForm.valid) {
      this.taskService.adicionarTarea(this.newTask).subscribe(() => {
        this.cargarTareas();
        this.newTask = {};
        taskForm.resetForm();
      });
    }
  }

  EditarTarea(task: any): void {
    this.editingTaskId = task.id;
    this.editingTask = { ...task };
  }

  guardarTarea(editForm: any): void {
    if (editForm.valid && this.editingTaskId) {
      this.taskService.editarTarea(this.editingTaskId, this.editingTask).subscribe(() => {
        this.cargarTareas();
        this.editingTaskId = null;
        this.editingTask = {};
        editForm.resetForm();
      });
    }
  }

  cancelarEdicion(): void {
    this.editingTaskId = null;
    this.editingTask = {};
  }

  eliminarTarea(id: string): void {
    this.taskService.eliminarTarea(id).subscribe(() => {
      this.cargarTareas();
    });
  }
}