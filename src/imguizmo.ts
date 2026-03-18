import { bind } from "./imgui";

// ── Enums ──

export enum OPERATION {
  TRANSLATE_X = 1 << 0,
  TRANSLATE_Y = 1 << 1,
  TRANSLATE_Z = 1 << 2,
  ROTATE_X = 1 << 3,
  ROTATE_Y = 1 << 4,
  ROTATE_Z = 1 << 5,
  ROTATE_SCREEN = 1 << 6,
  SCALE_X = 1 << 7,
  SCALE_Y = 1 << 8,
  SCALE_Z = 1 << 9,
  BOUNDS = 1 << 10,
  SCALE_XU = 1 << 11,
  SCALE_YU = 1 << 12,
  SCALE_ZU = 1 << 13,

  TRANSLATE = (1 << 0) | (1 << 1) | (1 << 2),
  ROTATE = (1 << 3) | (1 << 4) | (1 << 5) | (1 << 6),
  SCALE = (1 << 7) | (1 << 8) | (1 << 9),
  SCALEU = (1 << 11) | (1 << 12) | (1 << 13),
  UNIVERSAL = (1 << 0) | (1 << 1) | (1 << 2) | (1 << 3) | (1 << 4) | (1 << 5) | (1 << 6) | (1 << 11) | (1 << 12) | (1 << 13),
}

export enum MODE {
  LOCAL = 0,
  WORLD = 1,
}

export enum COLOR {
  DIRECTION_X = 0,
  DIRECTION_Y,
  DIRECTION_Z,
  PLANE_X,
  PLANE_Y,
  PLANE_Z,
  SELECTION,
  INACTIVE,
  TRANSLATION_LINE,
  SCALE_LINE,
  ROTATION_USING_BORDER,
  ROTATION_USING_FILL,
  HATCHED_AXIS_LINES,
  TEXT,
  TEXT_SHADOW,
  COUNT,
}

// ── Types ──

export type Matrix4 = number[];
export type Vector3 = [number, number, number];

export interface DecomposeResult {
  translation: Vector3;
  rotation: Vector3;
  scale: Vector3;
}

// ── Core API ──

export function BeginFrame(): void {
  bind.ImGuizmo_BeginFrame();
}

export function SetDrawlist(): void {
  bind.ImGuizmo_SetDrawlist();
}

export function SetRect(x: number, y: number, width: number, height: number): void {
  bind.ImGuizmo_SetRect(x, y, width, height);
}

export function SetOrthographic(isOrthographic: boolean): void {
  bind.ImGuizmo_SetOrthographic(isOrthographic);
}

export function Enable(enable: boolean): void {
  bind.ImGuizmo_Enable(enable);
}

export function IsOver(): boolean {
  return bind.ImGuizmo_IsOver();
}

export function IsUsing(): boolean {
  return bind.ImGuizmo_IsUsing();
}

export function IsUsingAny(): boolean {
  return bind.ImGuizmo_IsUsingAny();
}

export function SetGizmoSizeClipSpace(value: number): void {
  bind.ImGuizmo_SetGizmoSizeClipSpace(value);
}

export function AllowAxisFlip(value: boolean): void {
  bind.ImGuizmo_AllowAxisFlip(value);
}

export function SetAxisLimit(value: number): void {
  bind.ImGuizmo_SetAxisLimit(value);
}

export function SetPlaneLimit(value: number): void {
  bind.ImGuizmo_SetPlaneLimit(value);
}

// ── Manipulate ──

/**
 * Render and interact with a gizmo.
 * @param view - 4x4 view matrix (16 floats)
 * @param projection - 4x4 projection matrix (16 floats)
 * @param operation - TRANSLATE, ROTATE, SCALE, or combination
 * @param mode - LOCAL or WORLD
 * @param matrix - 4x4 object matrix (16 floats) — modified in place if gizmo is used
 * @param deltaMatrix - optional 4x4 matrix to receive the delta transform
 * @param snap - optional snap values (3 floats for translate, 1 for rotate angle)
 * @returns true if the matrix was modified
 */
export function Manipulate(
  view: Matrix4,
  projection: Matrix4,
  operation: OPERATION,
  mode: MODE,
  matrix: Matrix4,
  deltaMatrix?: Matrix4 | null,
  snap?: number[] | null,
): boolean {
  return bind.ImGuizmo_Manipulate(
    view,
    projection,
    operation,
    mode,
    matrix,
    deltaMatrix ?? null,
    snap ?? null,
  );
}

// ── Matrix Utilities ──

export function DecomposeMatrixToComponents(matrix: Matrix4): DecomposeResult {
  return bind.ImGuizmo_DecomposeMatrixToComponents(matrix);
}

export function RecomposeMatrixFromComponents(
  translation: Vector3,
  rotation: Vector3,
  scale: Vector3,
): Matrix4 {
  return bind.ImGuizmo_RecomposeMatrixFromComponents(translation, rotation, scale);
}

// ── Debug Drawing ──

export function DrawCubes(view: Matrix4, projection: Matrix4, matrices: number[], matrixCount: number): void {
  bind.ImGuizmo_DrawCubes(view, projection, matrices, matrixCount);
}

export function DrawGrid(view: Matrix4, projection: Matrix4, matrix: Matrix4, gridSize: number): void {
  bind.ImGuizmo_DrawGrid(view, projection, matrix, gridSize);
}

// ── View Manipulate ──

export function ViewManipulate(
  view: Matrix4,
  length: number,
  posX: number,
  posY: number,
  sizeX: number,
  sizeY: number,
  bgColor: number,
): void {
  bind.ImGuizmo_ViewManipulate(view, length, posX, posY, sizeX, sizeY, bgColor);
}

// ── ID Stack ──

export function PushID(id: number): void {
  bind.ImGuizmo_PushID(id);
}

export function PopID(): void {
  bind.ImGuizmo_PopID();
}
