"use client";

import type { ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import NavbarMain from "@/app/components/navbarMain";

type ProfileForm = {
  username: string;
  phone: string;
  facebook: string;
  instagram: string;
  lineId: string;
  address: string;
  profileImage: string;
};

const PROFILE_STORAGE_KEY = "rubHewProfile";

const defaultProfile: ProfileForm = {
  username: "ชื่อผู้ใช้",
  phone: "999-999-9999",
  facebook: "ชื่อผู้ใช้",
  instagram: "ชื่อผู้ใช้",
  lineId: "abcd1234",
  address: "1 หมู่1 ถ.มิตรภาพ",
  profileImage: "",
};

function ContactRow({
  icon,
  value,
  isEditing,
  onChange,
}: {
  icon: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-4 text-black">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black font-thainohead text-sm">
        {icon}
      </span>

      {isEditing ? (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="flex-1 border-b-2 border-[#8E806A] bg-transparent pb-1 font-thainohead text-2xl outline-none"
        />
      ) : (
        <span className="font-thainohead text-2xl">: {value}</span>
      )}

      {isEditing ? (
        <span className="font-thainohead text-xl text-black">✎</span>
      ) : null}
    </div>
  );
}

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileForm>(() => {
    if (typeof window === "undefined") {
      return defaultProfile;
    }

    const rawProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY);

    if (!rawProfile) {
      return defaultProfile;
    }

    try {
      const parsed = JSON.parse(rawProfile) as Partial<ProfileForm>;
      return { ...defaultProfile, ...parsed };
    } catch {
      return defaultProfile;
    }
  });

  const displayStars = useMemo(() => "★★★★☆", []);

  const saveProfile = () => {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setProfile((current) => ({ ...current, profileImage: result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-[#FFF8EC]">
      <NavbarMain />

      <section className="mx-auto max-w-6xl px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-thainohead text-2xl text-[#E0CCAC]"
        >
          <span className="text-3xl leading-none">‹</span>
          <span>ย้อนกลับ</span>
        </Link>

        <div className="mt-6 max-w-[620px] rounded-[2rem] bg-[#FBE7C5] p-6 shadow-[4px_5px_0_rgba(0,0,0,0.14)] ring-1 ring-[#E3D1B3]">
          <div className="flex items-start gap-5">
            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  fileInputRef.current?.click();
                }
              }}
              className="relative h-28 w-28 overflow-hidden rounded-full bg-gradient-to-b from-[#BDBDBD] to-[#727272]"
            >
              {profile.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt="Profile"
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : null}
            </button>

            <div className="flex-1 pt-3">
              {isEditing ? (
                <input
                  value={profile.username}
                  onChange={(event) =>
                    setProfile((current) => ({
                      ...current,
                      username: event.target.value,
                    }))
                  }
                  className="w-full border-b-2 border-[#8E806A] bg-transparent font-thainohead text-4xl text-black outline-none"
                />
              ) : (
                <h1 className="font-thainohead text-4xl text-black">
                  {profile.username}
                </h1>
              )}

              <p className="mt-2 font-thainohead text-2xl text-black">
                {displayStars}
              </p>

              {isEditing ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 rounded-full bg-[#D9C39A] px-4 py-2 font-thainohead text-lg text-black shadow-[0_4px_10px_rgba(0,0,0,0.16)]"
                >
                  เพิ่มรูปโปรไฟล์
                </button>
              ) : null}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <div className="mt-8 space-y-5">
            <ContactRow
              icon="☎"
              value={profile.phone}
              isEditing={isEditing}
              onChange={(value) =>
                setProfile((current) => ({ ...current, phone: value }))
              }
            />
            <ContactRow
              icon="f"
              value={profile.facebook}
              isEditing={isEditing}
              onChange={(value) =>
                setProfile((current) => ({ ...current, facebook: value }))
              }
            />
            <ContactRow
              icon="◎"
              value={profile.instagram}
              isEditing={isEditing}
              onChange={(value) =>
                setProfile((current) => ({ ...current, instagram: value }))
              }
            />
            <ContactRow
              icon="LINE"
              value={profile.lineId}
              isEditing={isEditing}
              onChange={(value) =>
                setProfile((current) => ({ ...current, lineId: value }))
              }
            />
            <ContactRow
              icon="⌂"
              value={profile.address}
              isEditing={isEditing}
              onChange={(value) =>
                setProfile((current) => ({ ...current, address: value }))
              }
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={saveProfile}
                  className="rounded-full bg-[#83D2CE] px-8 py-3 font-thainohead text-2xl text-black shadow-[0_4px_10px_rgba(0,0,0,0.16)]"
                >
                  บันทึก
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-full bg-[#D9C39A] px-8 py-3 font-thainohead text-2xl text-black shadow-[0_4px_10px_rgba(0,0,0,0.16)]"
                >
                  ยกเลิก
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-full bg-[#D9C39A] px-8 py-3 font-thainohead text-2xl text-black shadow-[0_4px_10px_rgba(0,0,0,0.16)]"
              >
                แก้ไขโปรไฟล์
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
