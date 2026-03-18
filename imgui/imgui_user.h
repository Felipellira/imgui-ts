#ifndef _IMGUI_USER_H
#define _IMGUI_USER_H

struct ImMat2
{
    float m11 = 1, m12 = 0;
    float m21 = 0, m22 = 1;

    inline void Identity()
    {
        m11 = 1; m12 = 0;
        m21 = 0; m22 = 1;
    }
    ImMat2 SetRotate(float rad);
    ImVec2 operator*(const ImVec2& p) const;
    ImMat2 operator*(const ImMat2& m) const;
};

struct ImTransform
{
    ImMat2 rotate;
    ImVec2 translate = ImVec2(0, 0);
    float scale = 1;

    ImVec2 operator*(const ImVec2& p) const;
    ImTransform operator*(const ImTransform& _tm) const;
    void Identity();
};

#endif
