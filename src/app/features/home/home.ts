import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';

interface Section {
  id: string;
  name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  // Liste der Sektionen für die Navigation und den Inhalt
  sections: Section[] = [
    { id: 'profile', name: 'Profil' },
    { id: 'games', name: 'Spiele' },
    { id: 'friends', name: 'Freunde' },
    { id: 'settings', name: 'Einstellungen' },
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
