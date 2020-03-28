import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PointsService} from '../../services/points.service';
import {isNumeric} from 'rxjs/util/isNumeric';
import {Point} from '../../model/model.point';
import {tryCatch} from 'rxjs/internal-compatibility';
import {isNull} from '@angular/compiler/src/output/output_ast';
import set = Reflect.set;

@Component({
  selector: 'app-check-point',
  templateUrl: './check-point.component.html',
  styleUrls: ['./check-point.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckPointComponent implements OnInit {
  @ViewChild('canvas', {static: true})
  canvas: ElementRef;

  @ViewChild('SelectR', {static: true})
  selectR: ElementRef;

  @ViewChild('submitBtn', {static: true})
  submitBtn: ElementRef;

  MAX_X = 5;
  MIN_X = -3;
  MAX_Y = 5;
  MIN_Y = -3;
  MAX_R = 5;
  MIN_R = -3;

  point: Point = new Point(0, 0, 1, false, Date.now());
  errorMessage: string;

  selectedX: number;
  selectedY: number;
  selectedR: number;
  AVAILABLE_R: number[] = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
  AVAILABLE_X: number[] = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
  AVAILABLE_Y: number[] = [-3, -2, -1, 0, 1, 2, 3, 4, 5];

  CANVAS_WIDTH = 400;
  CANVAS_HEIGHT = 400;
  CANVAS_STEP_X = this.CANVAS_WIDTH / 2 / 5;
  CANVAS_STEP_Y = this.CANVAS_HEIGHT / 2 / 5;
  LINE_COLOR = '#ffffff';

  constructor(private service: PointsService) {
  }

  ngOnInit() {
    this.selectedY = -3;
    this.selectedX = -3;
    this.drawGraph(-3);
  }

  addPointsFromForm() {
        this.point.x = this.selectedX;

        this.point.y = this.selectedY;
        this.point.r = this.selectedR;
        this.point.created = Date.now();
        this.addPoint();
  }

  addPoint() {
    console.log('adding point');

    if (!isNumeric(this.point.y) && !(this.AVAILABLE_Y.includes(this.point.y))) {
      this.error('выбранный y выходит за пределы значений доступных на данном уровне');
      return false;
    } else if (!isNumeric(this.point.x) && !(this.AVAILABLE_X.includes(this.point.x))) {
      this.error('выбранный x выходит за пределы значений доступных на данном уровне');
      return false;
    } else if (!isNumeric(this.point.r) && !(this.AVAILABLE_R.includes(this.point.r))) {
      this.error('[выбранный r выходит за пределы значений доступных на данном уровне');
      return false;
    }
    this.service.addPoint(this.point).subscribe(value => {
      value ? this.point.hit = true : this.point.hit = false;
      this.drawPoint(this.point);
    });

    return true;

  }

  getPointsRecalculated(r) {
    console.log('getting points for', r);
    this.service.getPointsRecalculated(r).subscribe(data => {
      (data as Point[]).forEach(p => this.drawPoint(p));
    });

  }


  addPointFromCanvas() {

    const centerX = this.CANVAS_WIDTH / 2;
    const centerY = this.CANVAS_HEIGHT / 2;
    const zoomX = this.CANVAS_WIDTH / 10;
    const zoomY = this.CANVAS_HEIGHT / 10;

    const event: MouseEvent = window.event as MouseEvent;

    const xCalculated = (event.offsetX - centerX) / zoomX;
    const yCalculated = (centerY - event.offsetY) / zoomY;

    this.point.x = xCalculated;
    this.point.y = yCalculated;

    this.point.r = this.selectedR;
    this.point.created = Date.now();
    this.addPoint();

  }

  drawPoint(point: Point) {

    const centerX = this.CANVAS_WIDTH / 2;
    const centerY = this.CANVAS_HEIGHT / 2;

    const zoomX = this.CANVAS_WIDTH / 10;
    const zoomY = this.CANVAS_HEIGHT / 10;

    const rightPoint = document.getElementById('rightPointImage');
    const wrongPoint = document.getElementById('wrongPointImage');

    const x = point.x, y = point.y, r = point.r, hit = point.hit;

    console.log('Marking point ' + x + ', ' + y + ', ' + hit);

    const context = this.canvas.nativeElement.getContext('2d');


    hit ? context.fillStyle = 'green' :
      context.fillStyle = 'red';

    context.fillRect(centerX + x * zoomX - 5, centerY - y * zoomY - 5, 8, 8);

  }

  clearCtx() {
    console.log(this.canvas);
    const context = this.canvas.nativeElement.getContext('2d');
    context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
  }

  drawGraph(r) {
    this.selectedR = r;
    console.log('Execution draw');
    this.clearCtx();
    this.draw(r,  1);
    this.getPointsRecalculated(r);
  }

  draw(r: number, alpha: number ) {
    const context = this.canvas.nativeElement.getContext('2d');
    context.globalAlpha = alpha;
    const R = r;
    const halfR = r / 2;

    context.fillStyle = 'yellow';
    context.beginPath();
    context.moveTo(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2);
    context.lineTo(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2 - this.CANVAS_STEP_Y * R);
    context.lineTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X * R, this.CANVAS_HEIGHT / 2 - this.CANVAS_STEP_Y * R);
    context.lineTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X * R, this.CANVAS_HEIGHT / 2);

    context.lineTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X * halfR, this.CANVAS_HEIGHT / 2);
    context.arcTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X * halfR, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y * halfR,
      this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y * halfR,
      Math.abs((this.CANVAS_STEP_X + this.CANVAS_STEP_Y) / 2 * halfR));

    context.lineTo(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2 - this.CANVAS_STEP_Y * halfR );
    context.lineTo(this.CANVAS_WIDTH / 2 - this.CANVAS_STEP_X * R, this.CANVAS_HEIGHT / 2 );
    context.lineTo(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2 );
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = this.LINE_COLOR;
    context.beginPath();
    context.moveTo(this.CANVAS_STEP_X / 2, this.CANVAS_HEIGHT / 2);
    context.lineTo(this.CANVAS_WIDTH - this.CANVAS_STEP_X / 2, this.CANVAS_HEIGHT / 2);
    context.moveTo(this.CANVAS_WIDTH - this.CANVAS_STEP_X, this.CANVAS_HEIGHT / 2 - this.CANVAS_STEP_Y / 4);
    context.lineTo(this.CANVAS_WIDTH - this.CANVAS_STEP_X / 2, this.CANVAS_HEIGHT / 2);
    context.lineTo(this.CANVAS_WIDTH - this.CANVAS_STEP_X, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y / 4);

    context.moveTo(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT - this.CANVAS_STEP_Y / 2);
    context.lineTo(this.CANVAS_WIDTH / 2, this.CANVAS_STEP_X / 2);
    context.moveTo(this.CANVAS_WIDTH / 2 - this.CANVAS_STEP_X / 4, this.CANVAS_STEP_Y);
    context.lineTo(this.CANVAS_WIDTH / 2, this.CANVAS_STEP_Y / 2);
    context.lineTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X / 4, this.CANVAS_STEP_Y);
    context.stroke();

  }

  isDesktopDisplay() {
    return document.body.clientWidth >= 1105;
  }

  private error(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
}
