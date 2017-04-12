import { Component } from '@angular/core';

@Component({
  selector: 'rb-footer',
  template: `
<footer id="footer">
  <div class="inner">
    <ul class="icons">
      <li><a href="#" class="icon alt fa-twitter"><span class="label">Twitter</span></a></li>
      <li><a href="#" class="icon alt fa-facebook"><span class="label">Facebook</span></a></li>
      <li><a href="#" class="icon alt fa-instagram"><span class="label">Instagram</span></a></li>
      <li><a href="#" class="icon alt fa-github"><span class="label">GitHub</span></a></li>
      <li><a href="#" class="icon alt fa-linkedin"><span class="label">LinkedIn</span></a></li>
    </ul>
    <ul class="copyright">
      <li>&copy; Untitled</li>
      <li>Design: <a href="https://github.com/NahuelOlgiati">Nahuel Olgiati</a></li>

    </ul>
  </div>
</footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
}
