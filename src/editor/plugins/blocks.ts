import "./css/app.css";
import $ from "jquery";

const default_opened_categories = [
  "Add Section",
  "Social",
  "Integrations",
  "Google",
  "Sell Online",
];

export default (editor, opts = {}) => {
  function addBlockSearch() {
    const block_search =
      '<div id="filter-block">\n' +
      ' <i class="fa fa-search"></i>   <input type="text" class="form-control gjs-field gjs-field-text" placeholder="Search Blocks">\n' +
      "</div>";
    $(".gjs-blocks-cs").prepend(block_search);
  }

  editor.on("load", () => {
    editor.Panels.getButton("views", "open-blocks").set("active", true);
    addBlockSearch(); // adds the input for for the search

    // sort blocks
    const mailchimp_block = $('.gjs-block-category  div[title="Embedded Form"]')
      .parent()
      .parent();
    mailchimp_block.prependTo(".gjs-block-categories");
    const google_block = $('.gjs-block-category  div[title="Tag Manager"]')
      .parent()
      .parent();
    google_block.prependTo(".gjs-block-categories");
    const social_block = $('.gjs-block-category  div[title="Facebook"]')
      .parent()
      .parent();
    social_block.prependTo(".gjs-block-categories");
    const integration_block = $(
      '.gjs-block-category  div[title="TawkTo Widget"]'
    )
      .parent()
      .parent();
    integration_block.prependTo(".gjs-block-categories");
    const product_block = $('.gjs-block-category  div[title="PayPal"]')
      .parent()
      .parent();
    product_block.prependTo(".gjs-block-categories");
    const section_block = $(
      '.gjs-block-category  div[title="Drag & Drop To Choose"]'
    )
      .parent()
      .parent();
    section_block.prependTo(".gjs-block-categories");

    // collapse categories
    const categories = editor.BlockManager.getCategories();
    categories.each((category) => {
      if (!default_opened_categories.includes(category.id)) {
        category.set("open", false).on("change:open", (opened) => {});
      }
    });
  });
};

// search algorithm
$(document).on("input", "#filter-block input", function () {
  const search_term = $(this).val().toLowerCase();

  $(".gjs-block-category").each(function () {
    let atLeastOneMatch = false;

    $(this)
      .find(".gjs-block")
      .each(function () {
        if (!$(this).data("original-html")) {
          $(this).data("original-html", $(this).html());
        }

        const label = $(this).text();
        if (label.toLowerCase().includes(search_term)) {
          $(this).removeClass("d-none");
          atLeastOneMatch = true;

          const regEx = new RegExp(`(${search_term})`, "gi");
          const highlightedText = label.replace(
            regEx,
            '<b class="gjs-four-color">$1</b>'
          );
          $(this)
            .find(".gjs-block-label")
            .html(
              $(this)
                .data("original-html")
                .replace(label.trim(), highlightedText)
            );
        } else {
          $(this).addClass("d-none");
          $(".gjs-block-label .gjs-block__media").addClass("d-none");
        }
      });

    $(this).removeClass("d-none");
    $(".gjs-block-label .gjs-block__media").addClass("d-none");
    if (!atLeastOneMatch) {
      $(this).addClass("d-none");
      $(".gjs-block-label .gjs-block__media").addClass("d-none");
    }
  });
});
