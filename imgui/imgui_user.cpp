#define IMGUI_DEFINE_MATH_OPERATORS
#include "imgui.h"
#include "imgui_internal.h"

#ifdef HAVE_IMGUI_DEMO
#include "imgui_demo.cpp"
#endif

extern ImGuiContext*   GImGui;

ImFont* GetCurrentFont()
{
	return GImGui->Font;
}

ImMat2 ImMat2::SetRotate(float rad)
{
	float c = cosf(rad);
	float s = sinf(rad);
	m11 = c; m12 = s;
	m21 = -s; m22 = c;
	return *this;
}

ImVec2 ImMat2::operator*(const ImVec2& p) const
{
	return ImVec2(
		m11 * p.x + m12 * p.y,
		m21 * p.x + m22 * p.y);
}

ImMat2 ImMat2::operator*(const ImMat2& m) const
{
	ImMat2 n;
	n.m11 = m11 * m.m11 + m12 * m.m21;
	n.m12 = m11 * m.m12 + m12 * m.m22;

	n.m21 = m21 * m.m11 + m22 * m.m21;
	n.m22 = m21 * m.m12 + m22 * m.m22;
	return n;
}

ImVec2 ImTransform::operator*(const ImVec2& p) const
{
	return ((rotate * p) * scale) + translate;
}
ImTransform ImTransform::operator*(const ImTransform& _tm) const
{
	ImTransform tm;
	tm.scale = scale * _tm.scale;
	tm.rotate = rotate * _tm.rotate;
	tm.translate = translate + (rotate * _tm.translate) * scale;
	return tm;
}
void ImTransform::Identity()
{
	rotate.Identity();
	scale = 1;
	translate.x = 0;
	translate.y = 0;
}
