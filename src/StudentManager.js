/**
 * Class StudentManager
 * Mengelola koleksi siswa dan operasi-operasi terkait
 * 
 * TODO: Implementasikan class StudentManager dengan:
 * - Constructor untuk inisialisasi array students
 * - Method addStudent(student) untuk menambah siswa
 * - Method removeStudent(id) untuk menghapus siswa
 * - Method findStudent(id) untuk mencari siswa
 * - Method updateStudent(id, data) untuk update data siswa
 * - Method getAllStudents() untuk mendapatkan semua siswa
 * - Method getTopStudents(n) untuk mendapatkan top n siswa
 * - Method displayAllStudents() untuk menampilkan semua siswa
 */

import fs from 'fs';
import Student from './Student.js';

class StudentManager {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - students: Array untuk menyimpan semua siswa
  
  constructor() {
    this.students = [];

    // === LOAD DATA JSON SAAT APLIKASI DIMULAI ===
    this.loadFromFile();
  }

  /**
   * === METHOD TAMBAHAN: Memuat data dari file JSON ===
   */
  loadFromFile() {
    try {
      const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
      if (data && Array.isArray(data.students)) {
        this.students = data.students.map(s => {
          const stu = new Student(s.id, s.name, s.class);
          stu.grades = s.grades || {};
          return stu;
        });
      }
    } catch (err) {
      console.log('Data kosong atau file belum dibuat, membuat file baru...');
      this.saveToFile();
    }
  }

  /**
   * === METHOD TAMBAHAN: Menyimpan data ke file JSON ===
   */
  saveToFile() {
    const data = {
      students: this.students
    };
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  }

  /**
   * Menambah siswa baru ke dalam sistem
   */
  addStudent(student) {
    if (this.students.some(s => s.id === student.id)) return false;
    this.students.push(student);

    // === SIMPAN PERUBAHAN ===
    this.saveToFile();

    return true;
  }

  /**
   * Menghapus siswa berdasarkan ID
   */
  removeStudent(id) {
    const index = this.students.findIndex(s => s.id === id);
    if (index === -1) return false;

    this.students.splice(index, 1);

    // === SIMPAN PERUBAHAN ===
    this.saveToFile();

    return true;
  }

  /**
   * Mencari siswa berdasarkan ID
   */
  findStudent(id) {
    return this.students.find(s => s.id === id) || null;
  }

  /**
   * Update data siswa
   */
  updateStudent(id, data) {
    const student = this.findStudent(id);
    if (!student) return false;

    if (data.name) student.name = data.name;
    if (data.class) student.class = data.class;

    // === SIMPAN PERUBAHAN ===
    this.saveToFile();

    return true;
  }

  /**
   * Mendapatkan semua siswa
   */
  getAllStudents() {
    return this.students;
  }

  /**
   * Mendapatkan top n siswa
   */
  getTopStudents(n) {
    return [...this.students]
      .sort((a, b) => b.getAverage() - a.getAverage())
      .slice(0, n);
  }

  /**
   * Menampilkan semua siswa
   */
  displayAllStudents() {
    if (this.students.length === 0) {
      console.log('Belum ada data siswa.');
      return;
    }
    this.students.forEach(s => s.displayInfo());
  }

  // BONUS (tidak diubah)
  getStudentsByClass(className) {
    return this.students.filter(s => s.class === className);
  }

  getClassStatistics(className) {
    const list = this.getStudentsByClass(className);
    if (list.length === 0) return null;

    const avg = list.reduce((a, s) => a + s.getAverage(), 0) / list.length;

    return {
      jumlah: list.length,
      rataRata: avg
    };
  }
}

export default StudentManager;
