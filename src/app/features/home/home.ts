import { NgComponentOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  QueryList,
  Type,
  ViewChildren,
} from '@angular/core';
import { Contact } from './sections/contact/contact';
import { LookinFor } from './sections/lookin-for/lookin-for';
import { Profile } from './sections/profile/profile';

interface Section {
  id: string;
  name: string;
  // Wir fügen eine Eigenschaft hinzu, um den Komponententyp zu speichern
  component: Type<any>;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  // Liste der Sektionen für die Navigation und den Inhalt
  sections: Section[] = [
    { id: 'profile', name: 'Profil', component: Profile },
    { id: 'contact', name: 'Kontakt', component: Contact },
    { id: 'looking-for', name: 'Wen suche ich?', component: LookinFor },
  ];

  // Greift auf die #section-Elemente im Template zu
  @ViewChildren('section', { read: ElementRef })
  sectionElements!: QueryList<ElementRef<HTMLElement>>;

  activeSectionId: string | null = this.sections[0]?.id ?? null;
  private observer!: IntersectionObserver;

  ngAfterViewInit(): void {
    // Der Observer wird ausgelöst, wenn ein Element zu 15% von oben
    // in den sichtbaren Bereich kommt.
    const options = {
      rootMargin: '-15% 0px -85% 0px',
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSectionId = entry.target.id;
          // Manuell die Change Detection anstoßen, da der Observer außerhalb von Angulars Zone läuft
          this.cdr.markForCheck();
        }
      });
    }, options);

    this.sectionElements.forEach((section) =>
      this.observer.observe(section.nativeElement)
    );
  }

  ngOnDestroy(): void {
    // Wichtig: Observer aufräumen, um Memory Leaks zu vermeiden.
    this.observer.disconnect();
  }
}
